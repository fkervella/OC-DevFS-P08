/**
 * BackendUser type de données définissant un utilisateur, transmis par le backend
 *
 * @interface BackendUser
 * @typedef {BackendUser}
 */
export interface BackendUser {
  id: number; // identifiant de l'utilisateur
  name: string; // Nomo de l'utilisateur
  picture: string; // Image de profil de l'utilisateur
  role: string; // Rôle de l'utilisateur dans l'application
  email: string; // email / identifiant de connexion de l'utilisateur
}

/**
 * BackendUpdateUser type de données définissant un utilisateur pour le mettre à jour, transmis par le backend
 *
 * @interface BackendUpdateUser
 * @typedef {BackendUpdateUser}
 */
export interface BackendUpdateUser {
  name: string; // nom de l'utilisateur
  picture: string; // image de profil de l'utilisateur
  role: string; // rôle de l'utilisateur dans l'application
}

/**
 * BackendProperty type de données définissant une propriété, transmis par le backend
 *
 * @interface BackendProperty
 * @typedef {BackendProperty}
 */
export interface BackendProperty {
  id: string; // identifiant de la propriété
  slug: string; // slug de la propriété
  title: string; // Titre de la propriété
  description: string; // Description de la propriété
  cover: string; // Image principale de la propriété
  location: string; // localisation de lap ropritété
  price_per_night: number; // prix par nuit de le propriété
  rating_avg: number; // notation moyenne de la propriété
  ratings_count: number; // nombre de notations de la propriété
  host: BackendHost; // données de l'hôite de la propriété
  equipments: string[]; // équipements de la propriété
  pictures: string[]; // images de la propriété
  tags: string[]; // catégories de la propriété
}

/**
 * BackendUpdateProperty type de données définissant une propriété pour la mettre à jour, transmis par le backend
 *
 * @interface BackendUpdateProperty
 * @typedef {BackendUpdateProperty}
 */
export interface BackendUpdateProperty {
  title: string; // Titre de la propriété
  description: string; // Description de la propriété
  cover: string; // Image principale de la propriété
  location: string; // localisation de la propriété
  price_per_night: number; // prix par nuit de la propriété
  host_id: number; // Identifiant de l'hôte de la propriété
}

/**
 * BackendLoginRequest type de données définissant la demande de login au backend
 *
 * @interface BackendLoginRequest
 * @typedef {BackendLoginRequest}
 */
export interface BackendLoginRequest {
  email: string; // email / identifiant de connexion de l'utilisateur
  password: string; // mot de passe de connexion de l'utilisateur
}

/**
 * BackendLoginResponse type de données définissant la réponse du backend suite à la demande de login
 *
 * @interface BackendLoginResponse
 * @typedef {BackendLoginResponse}
 */
export interface BackendLoginResponse {
  token: string; // token de connexion de l'utilisateur
  user: BackendUser; // données de connexion de l'utilisateur
}

/**
 * BackendRating type de données définissant une notation d'une propriété, transmis par le backend
 *
 * @interface BackendRating
 * @typedef {BackendRating}
 */
export interface BackendRating {
  id: number; // identifiant de la notation
  score: number; // valeur de la notation
  comment: string; // Commentaire de la notaion
  created_at: Date; // Date de création de la notation
  user: BackendUser; // données de l'utilisateur
}

/**
 * BackendPropertyRating type de données définissant la synthèse de toutes les notations d'une propriété, transmis par le backend
 *
 * @interface BackendPropertyRating
 * @typedef {BackendPropertyRating}
 */
export interface BackendPropertyRating {
  rating_avg: number; // notation moyenne de la propriété
  ratings_count: number; // nombre de notations de la propriété
  ratings: BackendRating[]; // notations de la propriété
}

/**
 * BackendFavorite type de donnée définissant une propriété favorite, transmis par le backend
 *
 * @interface BackendFavorite
 * @typedef {BackendFavorite}
 */
export interface BackendFavorite {
  id: string; // Identifiant de la propriété favorite
  slug: string; // slug de la propriété favorite
  title: string; // Titre de la propriété favorite
  description: string; // Description de la propriété favorite
  cover: string; // Image principale de la propriété favorite
  location: string; // localisation de la propriété favorite
  price_per_night: number; // Prix par nuit de la propriété favorite
  rating_avg: number; // notation moyenne de la propriété favorite
  ratings_count: number; // nombre de notations de la propriété favorite
  host: BackendHost; // données de l'hôte de la propriété favorite
}

/**
 * BackendHost type de donnée définissant un hôte, transmis par le backend
 *
 * @interface BackendHost
 * @typedef {BackendHost}
 */
export interface BackendHost {
  id: number; // identifiant de l'hôte
  name: string; // nom de l'hôte
  picture: string; // image de profil de l'hôte
}

/**
 * BackendFiles type de donnée définissant un fichier associé à une propriété, transmis par le backend
 *
 * @interface BackendFiles
 * @typedef {BackendFiles}
 */
export interface BackendFiles {
  url: string; // url du fichier
  filename: string; // nom du fichier
  size: number; // taille du fichier
  mimetype: string; // type mime du ficher
  purpose: string; // objet du fichier de la propriété
  property_id: string; // identifiant de la propriété associée au fichier
  instructions: string; // instructions pour le fichier
}

/**
 * BackendRequestResetResponse type de donnée transmis par le backend en réponse à la mise à jour du token
 *
 * @interface BackendRequestResetResponse
 * @typedef {BackendRequestResetResponse}
 */
export interface BackendRequestResetResponse {
  ok: boolean; // état de la réponse
  message: string; // message de la réponse
  token: string; // token de connexion
}

/**
 * BackendResetPasswordResponse type de donnée transmis par le backend en réponse à la mise à jour du mot de passe
 *
 * @interface BackendResetPasswordResponse
 * @typedef {BackendResetPasswordResponse}
 */
export interface BackendResetPasswordResponse {
  ok: boolean; // état de la réponse
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
