export interface BackendUser {
  id: number;
  name: string;
  picture: string;
  role: string;
}

export interface BackendUpdateUser {
  name: string;
  picture: string;
  role: string;
}

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
  host: {
    id: number;
    name: string;
    picture: string;
  };
}

export interface BackendUpdateProperty {
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  host_id: number;
}

export interface BackendLoginRequest {
  email: string;
  password: string;
}

export interface BackendLoginResponse {
  token: string;
  user: BackendUser;
}

export interface BackendRating {
  id: number;
  score: number;
  comment: string;
  created_at: Date;
  user: BackendUser;
}

export interface BackendPropertyRating {
  rating_avg: number;
  ratings_count: number;
  ratings: BackendRating[];
}

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

interface BackendHost {
  id: number;
  name: string;
  picture: string;
}

export interface BackendFiles {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  purpose: string;
  property_id: string;
  instructions: string;
}

export interface BackendRequestResetResponse {
  ok: boolean;
  message: string;
  token: string;
}

export interface BackendResetPasswordResponse {
  ok: boolean;
}

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
