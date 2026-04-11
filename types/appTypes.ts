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
