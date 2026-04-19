"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

import FavoriteButton from "@/app/_components/Common/FavoriteButton";
import { useFavorites } from "@/app/context/FavoriteContext";
import { AppProperty } from "@/types/appTypes";

/**
 * PropertyCardProps type de données en entrée du composant PropertyCard
 *
 * @interface PropertyCardProps
 * @typedef {PropertyCardProps}
 */

export interface PropertyCardProps {
  propertyData: AppProperty;
}

/**
 * PropertyCard Composant pour afficher une propriété sous forme de carte
 *
 * @return {ReactElement} code HTML de la cart de propriété
 */

export default function PropertyCard({
  propertyData,
}: PropertyCardProps): ReactElement {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isPropertyFavorite = isFavorite(propertyData.id);

  const handleFavoriteClick = () => {
    toggleFavorite(propertyData);
  };

  return (
    <div className="relative w-89">
      <div className="absolute top-4 right-4 z-10">
        <FavoriteButton
          isFavorite={isPropertyFavorite}
          onToggle={() => handleFavoriteClick()}
        />
      </div>

      <Link href={`/properties/${propertyData.id}?slug=${propertyData.slug}`}>
        <div className="flex flex-col gap-2 bg-white ">
          <div className="relative h-94 w-89">
            <Image
              src={propertyData.cover}
              alt={`image ${propertyData.title}`}
              fill
              className="object-cover rounded-t-lg"
              sizes="(max-width: 355px) 100vw, 33vw"
            />
          </div>
          <div className="flex flex-col gap-2 pt-2 pr-4 pb-5 pl-4 justify-between h-44">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium text-wrap">
                {propertyData.title}
              </h2>
              <p className="text-sm font-normal text-grayDark">
                {propertyData.location}
              </p>
            </div>
            <div className="text-sm font-medium text-black">
              {propertyData.price_per_night}€
              <span className="text-sm font-normal text-grayDark">
                {" "}
                par nuit
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
