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
 * PropertyPage Affichage de la page Property/[id]
 *
 * @param {PropertyPageProps} param0 props de PropertyPage
 * @return {unknown}
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
