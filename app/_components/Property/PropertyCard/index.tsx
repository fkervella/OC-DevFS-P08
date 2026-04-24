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
  propertyData: AppProperty; // Données d'une propriété
}

/**
 * PropertyCard Composant pour afficher une propriété sous forme de carte
 *
 * @return {ReactElement} code HTML de la carte de propriété
 */

export default function PropertyCard({
  propertyData,
}: PropertyCardProps): ReactElement {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isPropertyFavorite = isFavorite(propertyData.id);

  // Changement de l'état de favori d'une propriété
  const handleFavoriteClick = () => {
    toggleFavorite(propertyData);
  };

  /**
   * Données structurées Schema.org de type LodgingBusiness
   * Permet aux moteurs de recherche d'interpréter le logement,
   * sa localisation et son prix.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: propertyData.title,
    description: propertyData.description,
    image: propertyData.cover,
    url: `/properties/${propertyData.id}?slug=${propertyData.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: propertyData.location,
      addressCountry: "FR",
    },
    aggregateRating:
      propertyData.ratings_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: propertyData.rating_avg,
            reviewCount: propertyData.ratings_count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      price: propertyData.price_per_night,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: propertyData.price_per_night,
        priceCurrency: "EUR",
        unitText: "nuit",
      },
    },
  };

  return (
    <div className="relative w-89">
      {/* Données structurées JSON-LD pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-4 right-4 z-10">
        <FavoriteButton
          isFavorite={isPropertyFavorite}
          onToggle={() => handleFavoriteClick()}
        />
      </div>

      <Link href={`/properties/${propertyData.id}?slug=${propertyData.slug}`}>
        <article className="flex flex-col gap-2 bg-white">
          <div className="relative h-94 w-89">
            <Image
              src={propertyData.cover}
              alt={`Logement ${propertyData.title}`}
              fill
              className="object-cover rounded-t-lg"
              sizes="(max-width: 355px) 100vw, 33vw"
              loading="lazy"
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
              <span>{propertyData.price_per_night}€</span>
              <span className="text-sm font-normal text-grayDark">
                {" "}
                par nuit
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
