export interface User {
  id: number;
  name: string;
  picture: string;
  role: string;
}

export interface UpdateUser {
  name: string;
  picture: string;
  role: string;
}

export interface Property {
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

export interface UpdateProperty {
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  host_id: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Rating {
  id: number;
  score: number;
  comment: string;
  created_at: Date;
  user: User;
}

export interface PropertyRating {
  rating_avg: number;
  ratings_count: number;
  ratings: Rating[];
}

export interface Favorite {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  host: Host;
}

interface Host {
  id: number;
  name: string;
  picture: string;
}

export interface Files {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  purpose: string;
  property_id: string;
  instructions: string;
}

export interface RequestResetResponse {
  ok: boolean;
  message: string;
  token: string;
}

export interface ResetPasswordResponse {
  ok: boolean;
}

export type ApiResponses = {
  //Auth
  login: LoginResponse;
  register: LoginResponse;
  requestPasswordRequestToken: RequestResetResponse;
  resetPassword: ResetPasswordResponse;

  //Properties
  properties: Property[];
  property: Property;

  //Users
  users: User[];
  user: User;

  //Ratings
  propertyRatings: Rating[];

  //Favorites
  propertyFavorites: PropertyRating;
  userFavorites: Favorite[];

  //Uploads
  image: { data: string };
  images: { data: string };
};
