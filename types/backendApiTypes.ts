export interface User {
  id: number;
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

export type ApiResponses = {
  //Auth
  login: { data: string };
  register: { data: string };
  requestPasswordRequestToken: { data: string };
  resetPassword: { data: string };

  //Properties
  properties: Property[];
  property: Property;

  //Users
  users: User[];
  user: User;

  //Ratings
  propertyRatings: { data: string };

  //Favorites
  propertyFavorites: { data: string };
  userFavorites: { data: string };

  //Uploads
  image: { data: string };
  images: { data: string };
};
