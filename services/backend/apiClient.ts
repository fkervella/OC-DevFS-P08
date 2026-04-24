import { apiCore, ApiOptions } from "./apiCore";
import { ApiOperation } from "./apiRoutes";

const baseUrl =
  typeof window === "undefined"
    ? process.env.API_URL // côté serveur Next.js
    : process.env.NEXT_PUBLIC_API_URL; // côté navigateur

/**
 * getClientToken Récupère le token depuis les cookies navigateur (pour les appels client-side).
 * Côté serveur, le token est injecté par apiServer.ts via la session.
 *
 * @return {(string | undefined)} token
 */

function getClientToken(): string | undefined {
  if (typeof document === "undefined") return undefined;

  const match = document.cookie.match(/(?:^|;\s*)session=([^;]+)/);

  return match?.[1];
}

/**
 * apiClient Objet client API exposant les méthodes HTTP standards.
 * Chaque méthode utilise `apiCore` pour effectuer la requête avec les paramètres indiqués.
 *
 * @namespace apiClient
 * @property {Function} get - Effectue une requête HTTP GET
 * @property {Function} post - Effectue une requête HTTP POST
 * @property {Function} patch - Effectue une requête HTTP PATCH
 * @property {Function} delete - Effectue une requête HTTP DELETE
 *
 * @example
 * ```typescript
 * // Récupérer les données d'une propriété
 * const property = await apiClient.get('getProperty', { id: '123' });
 *
 * // Récupérer les données de toutes les propriétés
 * const property = await apiClient.get('getProperties');
 *
 * // Connexion de l'utilisateur
 * const loginReturn = await apiClient.post("login", { email: 'email', password: 'password' });
 *
 * ```
 */
export const apiClient = {
  get: <T extends ApiOperation>(operation: T, params?: ApiOptions["params"]) =>
    apiCore(operation, {
      method: "GET",
      params,
      baseUrl,
      token: getClientToken(),
    }),

  post: <T extends ApiOperation>(
    operation: T,
    body: unknown,
    params?: ApiOptions["params"],
  ) =>
    apiCore(operation, {
      method: "POST",
      body,
      params,
      baseUrl,
      token: getClientToken(),
    }),

  patch: <T extends ApiOperation>(
    operation: T,
    body: unknown,
    params?: ApiOptions["params"],
  ) =>
    apiCore(operation, {
      method: "PATCH",
      body,
      params,
      baseUrl,
      token: getClientToken(),
    }),

  delete: <T extends ApiOperation>(
    operation: T,
    params?: ApiOptions["params"],
  ) =>
    apiCore(operation, {
      method: "DELETE",
      params,
      baseUrl,
      token: getClientToken(),
    }),
};
