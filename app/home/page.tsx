"use server";

import { Suspense } from "react";

import { apiClient } from "@/services/backend/apiClient";
import { AppProperty } from "@/types/appTypes";
import { BackendProperty } from "@/types/backendApiTypes";
import { convertBackendToAppProperty } from "@/types/typesFunctions";

import HomePageLoading from "./loading";
import HomePageClient from "./pageClient";

export default async function HomePage() {
  const data: BackendProperty[] = await apiClient.get("properties");
  const properties: AppProperty[] = convertBackendToAppProperty(data);

  return (
    <Suspense fallback={<HomePageLoading />}>
      <HomePageClient properties={properties} />
    </Suspense>
  );
}
