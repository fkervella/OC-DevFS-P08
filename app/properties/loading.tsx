import { ReactElement } from "react";

import HowDoesItWorksCardSkeleton from "@/app/_components/Loader/HowDoesItWorksCardSkeleton";
import PropertyCardSkeleton from "@/app/_components/Loader/PropertyCardSkeleton";
import Skeleton from "@/app/_components/Loader/Skeleton";

export default function HomePageLoading(): ReactElement {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="text-center text-grayDark py-4">
        Chargement en cours...
      </div>
      {/* Section héro - Skeleton */}
      <div className="flex flex-col gap-4 text-center px-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>

      {/* Image principale - Skeleton */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-4 mb-6">
        <Skeleton className="w-full h-75 md:h-125 rounded-2xl" />
      </div>

      {/* Grille des propriétés - Skeleton */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>

      {/* Section "Comment ça marche ?" - Skeleton */}
      <div className="flex flex-col gap-6 md:gap-8 pt-8 pb-8 bg-white px-4">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <HowDoesItWorksCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
