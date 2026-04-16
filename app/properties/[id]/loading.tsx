import { ReactElement } from "react";

import HostInfosSkeleton from "@/app/_components/Loader/HostInfosSkeleton";
import PicturesDisplaySkeleton from "@/app/_components/Loader/PicturesDisplaySkeleton";
import PropertyInfosSkeleton from "@/app/_components/Loader/PropertyInfosSkeleton";
import Skeleton from "@/app/_components/Loader/Skeleton";

export default function PropertyLoading(): ReactElement {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-center text-grayDark py-4">
        Chargement en cours...
      </div>

      {/* Bouton retour annonces - Skeleton */}
      <div className="flex flex-col gap-4 px-4">
        <Skeleton className="h-8 w-1/4" />
      </div>

      <div className="grid grid-cols-[2fr_1fr] grid-rows-2 gap-2 mb-8 w-full">
        <PicturesDisplaySkeleton />
        <HostInfosSkeleton />
        <PropertyInfosSkeleton />
      </div>
    </div>
  );
}
