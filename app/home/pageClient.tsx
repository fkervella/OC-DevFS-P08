"use client";

import Image from "next/image";
import { ReactElement } from "react";

import HowDoesItWorksCard from "@/app/_components/Common/HowDoesItWorksCard";
import PropertyCard from "@/app/_components/Property/PropertyCard";
import { AppProperty } from "@/types/appTypes";

interface HomepageClientProps {
  property: AppProperty;
}

export default function HomePageClient({
  property,
}: HomepageClientProps): ReactElement {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Section héro */}
      <div className="flex flex-col gap-4 text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-mainRed">
          Chez vous, partout et ailleurs
        </h1>
        <p className="text-sm md:text-base font-normal text-black max-w-2xl mx-auto">
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </p>
      </div>

      {/* Image principale - responsive */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-4 mb-6">
        <Image
          src="/homepageImage.jpg"
          alt="Image de la page d'accueil"
          width={1200}
          height={675}
          className="w-full h-auto max-h-75 md:max-h-125 rounded-2xl object-cover"
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>

      {/* Grille des propriétés - responsive */}
      <div className="flex flex-wrap gap-4 justify-center">
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
      </div>

      {/* Section "Comment ça marche ?" */}
      <div className="flex flex-col gap-6 md:gap-8 pt-8 pb-8 bg-white px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-black text-center">
          Comment ça marche ?
        </h2>
        <p className="text-sm md:text-base font-normal text-black text-center max-w-2xl mx-auto">
          Que vous partiez pour un week-end improvisé, des vacances en famille
          ou un voyage professionnel,
          <br />
          Kasa vous aide à trouver un lieu qui vous ressemble.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          <HowDoesItWorksCard
            title="Recherchez"
            description="Entrez votre destination, vos dates et laissez Kasa faire le reste"
          />
          <HowDoesItWorksCard
            title="Réservez"
            description="Profitez d'une plateforme sécurisée et de profils d'hôtes vérifiés"
          />
          <HowDoesItWorksCard
            title="Vivez l'expérience"
            description="Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout"
          />
        </div>
      </div>
    </div>
  );
}
