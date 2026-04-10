import { apiCore, ApiOptions } from "./apiCore";
import { ApiOperation } from "./apiRoutes";

const baseUrl =
  typeof window === "undefined"
    ? process.env.API_URL // côté serveur Next.js
    : process.env.NEXT_PUBLIC_API_URL; // côté navigateur

// Récupère le token depuis les cookies navigateur (pour les appels client-side).
// Côté serveur, le token est injecté par apiServer.ts via la session.
function getClientToken(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  return match?.[1];
}

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
