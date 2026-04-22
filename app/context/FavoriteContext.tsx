"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { AppProperty } from "@/types/appTypes";

interface FavoritesContextType {
  favorites: AppProperty[];
  addFavorite: (property: AppProperty) => void;
  removeFavorite: (property: AppProperty) => void;
  isFavorite: (propertyId: string) => boolean;
  toggleFavorite: (property: AppProperty) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

const getInitialFavorites = (): AppProperty[] => {
  if (typeof window === "undefined") {
    return []; // Serveur : retourne tableau vide
  }
  try {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      if (Array.isArray(parsedFavorites)) {
        return parsedFavorites;
      }
    }
  } catch (error) {
    console.error("Erreur lors du parsing des favoris:", error);
    localStorage.removeItem("favorites");
  }
  return [];
};

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Initialisation directe depuis localStorage (pas de useEffect)
  const [favorites, setFavorites] =
    useState<AppProperty[]>(getInitialFavorites);

  // Sauvegarde dans localStorage à chaque changement
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

  const addFavorite = (property: AppProperty) => {
    setFavorites((prev) => {
      // Vérification si le logement est déjà dans les favoris
      if (prev.some((p) => p.id === property.id)) {
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeFavorite = (property: AppProperty) => {
    setFavorites((prev) => prev.filter((p) => p.id !== property.id));
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some((p) => p.id === propertyId);
  };

  const toggleFavorite = (property: AppProperty) => {
    const isAlreadyFavorite = isFavorite(property.id);

    if (isAlreadyFavorite) {
      removeFavorite(property);
      return false;
    } else {
      addFavorite(property);
      return true;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
