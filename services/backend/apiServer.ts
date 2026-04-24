import { getSession } from "@/lib/session";

import { apiCore, ApiOptions } from "./apiCore";
import { ApiOperation } from "./apiRoutes";

/**
 * apiServer appelle apiCore côté serveur
 * récupère le token d'authentification et indique l'url de base du backend
 *
 * @template {ApiOperation} T tyoe d'opération à exécuter
 * @param {T} operation identifiant de l'opération à effectuer
 * @param {ApiOptions} [options={}] données complémentaires de la requête
 * @return {unknown} réponse du serveur à la requête
 */

export async function apiServer<T extends ApiOperation>(
  operation: T,
  options: ApiOptions = {},
) {
  // récupération du token depuis le cookie
  const session = await getSession();
  const token = session?.token;

  return apiCore(operation, {
    ...options,
    token,
    baseUrl: process.env.API_URL,
  });
}
