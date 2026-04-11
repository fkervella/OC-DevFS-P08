"use server";

import { redirect } from "next/navigation";

import { authenticate } from "@/lib/auth";
import { createSession, deleteSession, SESSION_DURATION } from "@/lib/session";

/**
 * LoginAction vérification de l'identifiant et du mot de passe utilisateur lors de la connexion
 * Tentative d'authentification au backend
 * Création d'un cookie pour stocker le token
 *
 * @export
 * @async
 * @param {FormData} formData Données du formulaire de connexion utilisateur
 * @returns {Promise<{success: boolean, error?: string}>} Redirection vers la page dashboard en cas de succès
 */

export async function LoginAction(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await authenticate(
      formData.get("email") as string,
      formData.get("password") as string,
    );

    await createSession({
      ...user,
      expiresAt: new Date(Date.now() + SESSION_DURATION),
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

/**
 * logout Déconnexion de l'utilisateur
 * Suppression du cookie
 *
 * @export
 * @async
 * @returns {*}  Rediction vers la page de login
 */

export async function logout() {
  await deleteSession();

  redirect("/");
}
