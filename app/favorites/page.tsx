"use client";

import dynamic from "next/dynamic";
import { ReactElement } from "react";

import { useFavorites } from "@/app/context/FavoriteContext";
import { AppProperty } from "@/types/appTypes";

// Chargement des données lorsqu'elles ont besoin d'être affichées
const PropertyCard = dynamic(
  () => import("@/app/_components/Property/PropertyCard"),
);

export default function FavoritesPage(): ReactElement {
  const { favorites } = useFavorites();

  return (
    <div className="flex-1 flex justify-center mt-8">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-mainRed text-3xl font-black">Vos favoris</h1>
        <p className="text-center mb-5 text-sm">
          Retrouvez ici tous les logements que vous avez aimés.
          <br />
          Prêts à réserver ? Un simple clic et votre prochain séjour est en
          route
        </p>
        <div className="flex flex-col lg:flex-row flex-wrap gap-2 text-sm mb-8">
          {favorites.length > 0
            ? favorites.map((property: AppProperty) => (
                <PropertyCard key={property.slug} propertyData={property} />
              ))
            : "Vous n'avez pas sélectionné de favori actuellement"}
        </div>
      </div>
    </div>
  );
}
