import { ApiResponses } from "@/types/backendApiTypes";

import { API_ROUTES } from "./apiRoutes";

export interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  token?: string;
  baseUrl?: string;
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
  let url: string = API_ROUTES[operation];

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }

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

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  //TODO A vérifier si géré dans le backend
  // 204 No Content : pas de corps à parser
  if (response.status === 204) {
    return undefined as never;
  }

  return response.json();
}
