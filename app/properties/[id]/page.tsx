import { apiClient } from "@/services/backend/apiClient";
import { AppProperty } from "@/types/appTypes";
import { BackendProperty } from "@/types/backendApiTypes";
import { convertBackendToAppProperty } from "@/types/typesFunctions";

import PropertyClient from "./pageClient";

export interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  // Récupération des informations de la propriété
  const { id: propertyId } = await params;

  const data: BackendProperty = await apiClient.get("property", {
    id: propertyId,
  });

  const property: AppProperty = convertBackendToAppProperty(data);

  return <PropertyClient property={property} />;
}
