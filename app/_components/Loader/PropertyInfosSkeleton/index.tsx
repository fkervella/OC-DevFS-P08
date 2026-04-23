// app/_components/Common/HowDoesItWorksCardSkeleton.tsx
import { ReactElement } from "react";

import Skeleton from "@/app/_components/Loader/Skeleton";

export interface PropertyInfosSkeletonProps {
  className: string; // style de l'élément supérieur
}

export default function PropertyInfosSkeleton({
  className,
}: PropertyInfosSkeletonProps): ReactElement {
  return (
    <div
      className={`bg-white rounded-lg pt-6 pr-4 pb-6 pl-6 flex flex-col gap-2 w-full ${className}`}
    >
      <Skeleton className="h-10 w-1/2 mb-2" />
      <Skeleton className="h-8 w-1/2 mb-6" />
      <Skeleton className="h-16 w-full mb-6" />
      <Skeleton className="h-8 w-1/4 mb-2" />
      <Skeleton className="h-20 w-full mb-2" />
      <Skeleton className="h-8 w-1/4 mb-2" />
      <Skeleton className="h-20 w-full mb-2" />
    </div>
  );
}
