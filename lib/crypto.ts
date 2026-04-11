import "server-only";

import { jwtVerify, SignJWT } from "jose";

import { AppCookieData } from "@/types/appTypes";

/**
 * secretKey clé de chiffrement et déchiffrement des token
 *
 * @type {string}
 */

const secretKey: string = process.env.SESSION_SECRET!;
if (!secretKey)
  throw new Error(
    "SESSION_SECRET est manquant dans les variables d'environnement",
  );

/**
 * encodedKey clé chiffré de chiffrement et déchiffrement des token
 *
 * @type {Uint8Array}
 */
const encodedKey: Uint8Array = new TextEncoder().encode(secretKey);

/**
 * encrypt fonction de création du JWT
 *
 * @export
 * @param {AppCookieData} payload donnée à chiffrer
 * @returns {Promise<string>} token chiffré
 */

export function encrypt(payload: AppCookieData): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * decrypt fonction de déchiffrement du token JWT
 *
 * @export
 * @async
 * @param {string} token token à déchiffrer
 * @returns {Promise<AppCookieData>} En cas de réussite, données déchiffrées
 */

export async function decrypt(token: string): Promise<AppCookieData> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });

    //Vérification du contenu du token
    if (!isAppCookieData(payload))
      throw new Error("Contenu du cookie invalide, des champs sont manquants");

    //Conversion des données du cookie en type géré dans l'application
    return payload;
  } catch (error) {
    throw new Error(`Failed to verify session : ${(error as Error).message}`, {
      cause: error,
    });
  }
}

function isAppCookieData(input: unknown): input is AppCookieData {
  return (
    typeof input === "object" &&
    input !== null &&
    "token" in input &&
    "username" in input &&
    "userId" in input &&
    "expiresAt" in input
  );
}
