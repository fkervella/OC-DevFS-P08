// app/_components/Property/PropertyCardSkeleton.tsx
import { ReactElement } from "react";

import Skeleton from "@/app/_components/Loader/Skeleton";

export default function PropertyCardSkeleton(): ReactElement {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-lg overflow-hidden w-89 shadow">
      <Skeleton className="h-94 w-full" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}
