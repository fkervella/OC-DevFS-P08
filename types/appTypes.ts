export interface AppUser {
  name: string;
  email: string;
  token: string;
  picture: string;
  role: string;
}

export interface AppCookieData extends AppUser {
  expiresAt: Date;
  [key: string]: unknown; //pour JWT
}

export interface AppProperty {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  favorite?: boolean;
  pictures: string[];
  equipments: string[];
  tags: string[];
  host: {
    id: number;
    name: string;
    picture: string;
  };
}
