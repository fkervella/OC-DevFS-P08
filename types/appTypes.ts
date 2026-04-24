/**
 * AppUser interface des données d'un utilisateur, côté application front
 *
 * @interface AppUser
 * @typedef {AppUser}
 */
export interface AppUser {
  name: string; // Nom de l'utilisateur
  email: string; // Email et identifiant de connexion de l'utilisateur
  token: string; // token JWT de l'utilisateur connecté
  picture: string; // image de profil de l'utilisateur
  role: string; // Rôle de l'utilisateur dans l'application
}

/**
 * AppCookieData interfaces des données utilisateur contenant aussi les informations de connexion
 *
 * @interface AppCookieData
 * @typedef {AppCookieData}
 * @augments {AppUser}
 */
export interface AppCookieData extends AppUser {
  expiresAt: Date; // Date d'expiration du token
  [key: string]: unknown; //pour JWT
}

/**
 * AppProperty interface des données d'un propriété, côté application front
 *
 * @interface AppProperty
 * @typedef {AppProperty}
 */
export interface AppProperty {
  id: string; // Identifiant de la propriété
  slug: string; // slug de la propriété
  title: string; // titre de la propriété
  description: string; // description de la proprété
  cover: string; // image principale de la propriété
  location: string; // information de localisation de la propriété
  price_per_night: number; // prix à la nuit de la propriété
  rating_avg: number; // notation moyenne de la propriété
  ratings_count: number; // nombre de notations de la propriété
  favorite?: boolean; // propriété faisant partie des favoris de l'utilisateur
  pictures: string[]; // images de la propriété
  equipments: string[]; // équipements de la propriété
  tags: string[]; // catégories de la propriété
  host: AppHost; // données de l'hôte de la propriété
}

/**
 * AppHost type de donnée définissant un hôte, côté application Front
 *
 * @interface AppHost
 * @typedef {AppHost}
 */

export interface AppHost {
  id: number; // Identifiant de l'hôte
  name: string; // Nom de l'hôte
  picture: string; // image de profil de l'hôte
}

export type Status = "idle" | "loading" | "success" | "error";
