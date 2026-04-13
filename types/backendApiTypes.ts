/**
 * BackendUser type de données définissant un utilisateur, transmis par le backend
 *
 * @interface BackendUser
 * @typedef {BackendUser}
 */
export interface BackendUser {
  id: number;
  name: string;
  picture: string;
  role: string;
}

/**
 * BackendUpdateUser type de données définissant un utilisateur pour le mettre à jour, transmis par le backend
 *
 * @interface BackendUpdateUser
 * @typedef {BackendUpdateUser}
 */
export interface BackendUpdateUser {
  name: string;
  picture: string;
  role: string;
}

/**
 * BackendProperty type de données définissant une propriété, transmis par le backend
 *
 * @interface BackendProperty
 * @typedef {BackendProperty}
 */
export interface BackendProperty {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  host: BackendHost;
}

/**
 * BackendUpdateProperty type de données définissant une propriété pour la mettre à jour, transmis par le backend
 *
 * @interface BackendUpdateProperty
 * @typedef {BackendUpdateProperty}
 */
export interface BackendUpdateProperty {
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  host_id: number;
}

/**
 * BackendLoginRequest type de données définissant la demande de login au backend
 *
 * @interface BackendLoginRequest
 * @typedef {BackendLoginRequest}
 */
export interface BackendLoginRequest {
  email: string;
  password: string;
}

/**
 * BackendLoginResponse type de données définissant la réponse du backend suite à la demande de login
 *
 * @interface BackendLoginResponse
 * @typedef {BackendLoginResponse}
 */
export interface BackendLoginResponse {
  token: string;
  user: BackendUser;
}

/**
 * BackendRating type de données définissant une notation d'une propriété, transmis par le backend
 *
 * @interface BackendRating
 * @typedef {BackendRating}
 */
export interface BackendRating {
  id: number;
  score: number;
  comment: string;
  created_at: Date;
  user: BackendUser;
}

/**
 * BackendPropertyRating type de données définissant la synthèse de toutes les notations d'une propriété, transmis par le backend
 *
 * @interface BackendPropertyRating
 * @typedef {BackendPropertyRating}
 */
export interface BackendPropertyRating {
  rating_avg: number;
  ratings_count: number;
  ratings: BackendRating[];
}

/**
 * BackendFavorite type de donnée définissant une propriété favorite, transmis par le backend
 *
 * @interface BackendFavorite
 * @typedef {BackendFavorite}
 */
export interface BackendFavorite {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  host: BackendHost;
}

/**
 * BackendHost type de donnée définissant un hôte, transmis par le backend
 *
 * @interface BackendHost
 * @typedef {BackendHost}
 */
export interface BackendHost {
  id: number;
  name: string;
  picture: string;
}

/**
 * BackendFiles type de donnée définissant un fichier associé à une propriété, transmis par le backend
 *
 * @interface BackendFiles
 * @typedef {BackendFiles}
 */
export interface BackendFiles {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  purpose: string;
  property_id: string;
  instructions: string;
}

/**
 * BackendRequestResetResponse type de donnée transmis par le backend en réponse à la mise à jour du token
 *
 * @interface BackendRequestResetResponse
 * @typedef {BackendRequestResetResponse}
 */
export interface BackendRequestResetResponse {
  ok: boolean;
  message: string;
  token: string;
}

/**
 * BackendResetPasswordResponse type de donnée transmis par le backend en réponse à la mise à jour du mot de passe
 *
 * @interface BackendResetPasswordResponse
 * @typedef {BackendResetPasswordResponse}
 */
export interface BackendResetPasswordResponse {
  ok: boolean;
}

/**
 * ApiResponses types de réponses pouvant être envoyées au backend ou transmises au backend
 *
 * @typedef {ApiResponses}
 */
export type ApiResponses = {
  //Auth
  login: BackendLoginResponse;
  register: BackendLoginResponse;
  requestPasswordRequestToken: BackendRequestResetResponse;
  resetPassword: BackendResetPasswordResponse;

  //Properties
  properties: BackendProperty[];
  property: BackendProperty;

  //Users
  users: BackendUser[];
  user: BackendUser;

  //Ratings
  propertyRatings: BackendRating[];

  //Favorites
  propertyFavorites: BackendPropertyRating;
  userFavorites: BackendFavorite[];

  //Uploads
  image: { data: string };
  images: { data: string };
};
