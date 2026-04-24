import Image from "next/image";
import { ReactElement } from "react";

import PropertyItem from "@/app/_components/Common/PropertyItem";
import { AppProperty } from "@/types/appTypes";

export interface PropertyInfosProps {
  property: AppProperty; // données d'une propriété
  className: string; // style de l'élément supérieur
}

export default function PropertyInfos({
  property,
  className,
}: PropertyInfosProps): ReactElement {
  /**
   * Données structurées Schema.org de type LodgingBusiness pour la page détail.
   * Complète les informations de la carte avec équipements et catégories.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.title,
    description: property.description,
    image: property.cover,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "FR",
    },
    amenityFeature: property.equipments.map((equipment) => ({
      "@type": "LocationFeatureSpecification",
      name: equipment,
      value: true,
    })),
    aggregateRating:
      property.ratings_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: property.rating_avg,
            reviewCount: property.ratings_count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      price: property.price_per_night,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: property.price_per_night,
        priceCurrency: "EUR",
        unitText: "nuit",
      },
    },
  };

  return (
    <div
      className={`bg-white rounded-lg pt-6 pr-4 pb-6 pl-6 flex flex-col gap-2 ${className}`}
    >
      {/* Données structurées JSON-LD pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-2xl font-medium text-black mb-2">{property.title}</h1>
      <address className="flex flex-row gap-2 items-center mb-6">
        <Image
          src="/iconLocalisation.png"
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          className="h-4 w-auto"
        />
        <span className="font-normal text-sm text-grayDark">
          {property.location}
        </span>
      </address>

      <p className="font-normal text-sm text-black mb-6">
        {property.description}
      </p>

      <h2 className="text-sm font-normal text-black mb-2">Equipements</h2>
      <ul className="w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
        {property.equipments.map((equipment: string) => (
          <li key={equipment}>
            <PropertyItem text={equipment} />
          </li>
        ))}
      </ul>

      <h2 className="text-sm font-normal text-black">Catégories</h2>
      <ul className="w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {property.tags.map((tag: string) => (
          <li key={tag}>
            <PropertyItem text={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}
