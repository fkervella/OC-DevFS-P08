import { ReactElement } from "react";

import HostInfosSkeleton from "@/app/_components/Loader/HostInfosSkeleton";
import PicturesDisplaySkeleton from "@/app/_components/Loader/PicturesDisplaySkeleton";
import PropertyInfosSkeleton from "@/app/_components/Loader/PropertyInfosSkeleton";
import Skeleton from "@/app/_components/Loader/Skeleton";

export default function PropertyLoading(): ReactElement {
  return (
    <div className="flex flex-col gap-2 w-full m-4">
      <div className="text-center text-grayDark py-4">
        Chargement en cours...
      </div>

      {/* Bouton retour annonces - Skeleton */}
      <div className="flex flex-col gap-4 px-4">
        <Skeleton className="h-8 w-1/4" />
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-2 mb-8 w-full">
        <PicturesDisplaySkeleton />
        <PropertyInfosSkeleton className="lg:col-start-1 lg:row-start-2" />
        <HostInfosSkeleton className="lg:col-start-2 lg:row-start-1" />
      </div>
    </div>
  );
}
