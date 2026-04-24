import type { Metadata } from "next";

import { apiClient } from "@/services/backend/apiClient";
import { AppProperty } from "@/types/appTypes";
import { BackendProperty } from "@/types/backendApiTypes";
import { convertBackendToAppProperty } from "@/types/typesFunctions";

import PropertyClient from "./pageClient";

/**
 * PropertyPageProps données pour l'affichage de la page property/[id]
 *
 * @interface PropertyPageProps
 * @typedef {PropertyPageProps}
 */

export interface PropertyPageProps {
  params: {
    id: string; // identifiant de la propriété
  };
}

/**
 * generateMetadata génère les métadonnées dynamiques pour la page property/[id]
 *
 * @param {PropertyPageProps} param0
 * @return {Promise<Metadata>} Métadonnées de la page
 */

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id: propertyId } = await params;

  const data: BackendProperty = await apiClient.get("property", {
    id: propertyId,
  });

  const property: AppProperty = convertBackendToAppProperty(data);

  return {
    title: `${property.title} — ${property.location}`,
    description: property.description,
    openGraph: {
      title: `${property.title} — ${property.location}`,
      description: property.description,
      images: [
        {
          url: property.cover,
          alt: property.title,
        },
      ],
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.title} — ${property.location}`,
      description: property.description,
      images: [property.cover],
    },
  };
}

/**
 * PropertyPage Affichage de la page Property/[id]
 *
 * @param {PropertyPageProps} param0
 * @return {ReactElement} Code HTML de la page property/[id]
 */

export default async function PropertyPage({ params }: PropertyPageProps) {
  // Récupération des informations de la propriété
  const { id: propertyId } = await params;

  const data: BackendProperty = await apiClient.get("property", {
    id: propertyId,
  });

  const property: AppProperty = convertBackendToAppProperty(data);

  return <PropertyClient property={property} />;
}
