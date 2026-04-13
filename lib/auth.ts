import "server-only";

import { apiClient } from "@/services/backend/apiClient";
import { AppUser } from "@/types/appTypes";
/**
 * authenticate Fonction d'authentification de l'utilisateur au back-end
 *
 * @param {string} email email (identifiant) de l'utilisateur
 * @param {string} password mot de passe de l'utilisateur
 * @return {Promise<AppUser>} en cas de réussite, données de l'utilisateur
 * @throws {Error} en cas d'échec, lance une erreur avec le message d'erreur du serveur ou un message générique
 */

export async function authenticate(
  email: string,
  password: string,
): Promise<AppUser> {
  try {
    const loginReturn = await apiClient.post("login", { email, password });

    //Retourne un objet AppUser
    return {
      //TODO email: loginReturn.user.email,
      email: "",
      name: loginReturn.user.name,
      token: loginReturn.token,
      picture: loginReturn.user.picture,
      role: loginReturn.user.role,
    };
  } catch (error) {
    throw new Error(
      (error as Error).message || "Erreur inconnue survenue à la connexion",
      { cause: error },
    );
  }
}
