import { apiClient } from "@/services/backend/apiClient";
import { AppProperty } from "@/types/appTypes";
import { BackendProperty } from "@/types/backendApiTypes";
import { convertBackendToAppProperty } from "@/types/typesFunctions";

import HomePageClient from "./pageClient";

export default async function HomePage() {
  const data: BackendProperty[] = await apiClient.get("properties");
  const properties: AppProperty[] = convertBackendToAppProperty(data);

  return <HomePageClient properties={properties} />;
}
