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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-bold text-mainRed text-center">
          Chez vous, partout et ailleurs
        </div>
        <div className="text-sm font-normal text-black text-center">
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </div>
      </div>
      <Image
        src="/homepageImage.jpg"
        alt="Image de la page d'accueil"
        width={2400}
        height={1920}
        className="rounded-2xl h-112 overflow-hidden object-cover mt-4 mb-3"
        loading="eager"
      />
      <div className="flex flex-row flex-wrap gap-4 justify-between">
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
        <PropertyCard propertyData={property} />
      </div>
      <div className="flex flex-col gap-8 pt-8 pb-8 bg-white">
        <div className="text-2xl font-semibold text-black text-center">
          Comment ça marche ?
        </div>
        <div className="text-sm font-normal text-black text-center">
          Que vous partiez pour un week-end improvisé, des vacances en famille
          ou un voyage professionnel,
          <br />
          Kasa vous aide à trouver un lieu qui vous ressemble.
        </div>
        <div className="flex flex-row gap-4 justify-center">
          <HowDoesItWorksCard
            title="Recherchez"
            description="Entrez votres destination, vos dates et laissez Kasa faire le reste"
          />
          <HowDoesItWorksCard
            title="Réservez"
            description="Profitez d'une plateforme sécurisée et de profils d'hôtes vérifiés"
          />
          <HowDoesItWorksCard
            title="Vivez l'expérience"
            description="Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partour"
          />
        </div>
      </div>
    </div>
  );
}
