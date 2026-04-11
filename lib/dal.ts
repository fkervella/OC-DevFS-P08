import "server-only";

import { NextResponse } from "next/server";
import { cache } from "react";

import { getSession } from "@/lib/session";
import { AppCookieData } from "@/types/appTypes";

/**
 * Description placeholder
 *
 * @type {Promise<{ isAuth: true, session: AppCookieData } | NextResponse>}
 */
export const verifySession = cache(
  async (): Promise<
    { isAuth: true; session: AppCookieData } | NextResponse
  > => {
    const session = await getSession();

    if (!session) {
      return NextResponse.redirect(
        new URL("/login", process.env.NEXT_PUBLIC_APP_URL),
      );
    }

    return { isAuth: true, session };
  },
);

/**
 * getUserData récupération des données de l'utilsateur depuis  le cookie de session
 *
 * @export
 * @returns {Promise<AppCookieData | null>} données de l'utilisateur
 */

export const getUserData = cache(async (): Promise<AppCookieData | null> => {
  const session = await getSession();

  return session ?? null;
});
