import "server-only";

import { cookies } from "next/headers";

import { decrypt, encrypt } from "@/lib/crypto";
import { AppCookieData } from "@/types/appTypes";

/**
 * SESSION_DURATION Durée de vie de la session utilisateur
 *
 * @type {number}
 */
export const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

/**
 * createSession fonction de création de la session et de la sauvegarde du cookie
 *
 * @export
 * @async
 * @param {AppCookieData} user données de l'utilisateur
 * @returns {Promise<void>} pas de retour
 */
export async function createSession(user: AppCookieData): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  const session = await encrypt({ ...user, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * getSession fonction de récupération de la session à partir du cookie
 *
 * @export
 * @async
 * @returns {Promise<AppCookieData | null>} en cas de réussite, données du token contenu dans le cookie
 */

export async function getSession(): Promise<AppCookieData | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if (!token) return null; // token invalide ou expiré

    const cookieData = decrypt(token);

    return cookieData;
  } catch (error) {
    throw new Error(`Failed to verify session : ${(error as Error).message}`, {
      cause: error,
    });

    return null;
  }
}

/**
 * deleteSession fonction de suppression du cookie de session
 *
 * @export
 * @async
 * @returns {Promise<void>} pa de retour
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

/**
 * refreshSession Fonction permettant de rafraîchir la session
 *
 * @export
 * @async
 * @returns {Promise<AppCookieData | null>} données du cookie
 */

export async function refreshSession(): Promise<AppCookieData | null> {
  const session = await getSession();

  if (!session) return null;

  await createSession(session);

  return session;
}
