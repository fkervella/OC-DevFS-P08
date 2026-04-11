import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/session";

/**
 * publicRoutes liste des routes publiques
 *
 */
const publicRoutes = [
  "/",
  "/home",
  "/about",
  "/login",
  "/signin",
  "/testConnexionBackend",
];

/**
 * protectedRoutes liste des routes privées/protégées
 *
 */
const protectedRoutes = ["/properties", "/addProperty", "/favorites", "/chat"];

/**
 * isAuthenticated vérifie si l'utilisateur a une session valide
 */

async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * handleProtectedRoute gère la redirection pour les routes protégées
 */

async function handleProtectedRoute(
  request: NextRequest,
): Promise<NextResponse> {
  if (await isAuthenticated()) return NextResponse.next();

  return NextResponse.redirect(new URL("/login", request.nextUrl));
}

/**
 * handlePublicRoute gère la redirection pour les routes publiques
 */

function handlePublicRoute(): NextResponse {
  return NextResponse.next();
}

/**
 * proxy routeur de l'application
 *
 * @export
 * @async
 * @param {NextRequest} request page demandée
 * @returns {Promise<NextResponse>} page à afficher
 */

export default async function proxy(
  request: NextRequest,
): Promise<NextResponse> {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  if (!isProtectedRoute && !isPublicRoute) {
    // La page demandée n'est pas connue
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    // La page demandée est protégée et l'utilisateur est connecté
    return handleProtectedRoute(request);
  }

  return handlePublicRoute();
}

/**
 * config configuration du proxy Next.js
 *
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
