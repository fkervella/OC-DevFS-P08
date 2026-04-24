// routes du backend

export const API_ROUTES = {
  // Auth
  login: "/auth/login",
  register: "/auth/register",
  requestPasswordRequestToken: "/auth/request-reset",
  resetPassword: "/auth/reset-password",

  // Properties
  properties: "/api/properties",
  property: "/api/properties/:id",

  // Users
  users: "/api/users",
  user: "/api/users/:id",

  // Ratings
  propertyRatings: "/api/properties/:id/ratings",

  //Favorites
  propertyFavorites: "/api/properties/:id/favorite",
  userFavorites: "/api/users/:id/favorite",

  // Uploads
  image: "/api/uploads/image",
  images: "/api/uploads/images",
} as const;

export type ApiOperation = keyof typeof API_ROUTES;
