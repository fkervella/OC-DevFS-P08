import { ApiResponses } from "@/types/backendApiTypes";

import { API_ROUTES } from "./apiRoutes";

/**
 * ApiOptions données de la requête vers le backend
 *
 * @interface ApiOptions
 * @typedef {ApiOptions}
 * @augments {Omit<RequestInit, "body">}
 */
export interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown; // contenu du body de la requete
  headers?: Record<string, string>; // header de la requêt
  params?: Record<string, string | number>; // paramètres passés par l'url
  token?: string; // token de connexion de l'utilisateur
  baseUrl?: string; // url de base de la requête
}

export async function apiCore<T extends keyof typeof API_ROUTES>(
  operation: T,
  {
    method = "GET",
    body,
    headers = {},
    params,
    token,
    baseUrl,
    ...rest
  }: ApiOptions = {},
): Promise<T extends keyof ApiResponses ? ApiResponses[T] : unknown> {
  // récupération de l'url correspondant à l'opération demandée
  let url: string = API_ROUTES[operation];

  // ajout des paramètres à la requête
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }

  // Envoi de la requête
  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  // Gestion d'un retour négatif
  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  // 204 No Content : pas de corps à parser
  if (response.status === 204) {
    return undefined as never;
  }

  // Transmission de la réponse au demandeur
  return response.json();
}
