import { getSession } from "@/lib/session";

import { apiCore, ApiOptions } from "./apiCore";
import { ApiOperation } from "./apiRoutes";

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
