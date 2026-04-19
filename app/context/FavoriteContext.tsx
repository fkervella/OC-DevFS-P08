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

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // charger les favoris depuis le localStorage
  const getInitialFavorites = (): AppProperty[] => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  };

  const [favorites, setFavorites] =
    useState<AppProperty[]>(getInitialFavorites);

  // sauvegarde dans localStorage à chaque changement
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

  const addFavorite = (property: AppProperty) => {
    setFavorites((prev) => {
      //Vérification si le logement est déjà dans les favoris
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
    if (isFavorite(property.id)) {
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

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
