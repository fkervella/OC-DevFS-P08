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
  favorites: AppProperty[]; // Liste de propriétés favorites
  addFavorite: (property: AppProperty) => void; // Ajout d'un favori
  removeFavorite: (property: AppProperty) => void; // Suppression d'un favori
  isFavorite: (propertyId: string) => boolean; // Etat favori d'une propriété
  toggleFavorite: (property: AppProperty) => boolean; // Changement d'état d'un favori
}

// Création du contexte
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

// Récupération des favoris dans le local storage
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

// Provider du contexte
export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Initialisation depuis localStorage
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

  // Ajout d'un favori
  const addFavorite = (property: AppProperty) => {
    setFavorites((prev) => {
      // Vérification si le logement est déjà dans les favoris
      if (prev.some((p) => p.id === property.id)) {
        return prev;
      }
      return [...prev, property];
    });
  };

  // Suppression d'un favori
  const removeFavorite = (property: AppProperty) => {
    setFavorites((prev) => prev.filter((p) => p.id !== property.id));
  };

  // Etat favori d'une propriété
  const isFavorite = (propertyId: string) => {
    return favorites.some((p) => p.id === propertyId);
  };

  // Changement d'état d'un favori
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
    throw new Error(
      "useFavorites doit être utilisé dans le contexte FavoritesProvider",
    );
  }

  return context;
}
