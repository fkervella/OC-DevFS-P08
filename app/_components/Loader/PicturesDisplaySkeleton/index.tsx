// app/_components/Common/HowDoesItWorksCardSkeleton.tsx
import { ReactElement } from "react";

import Skeleton from "@/app/_components/Loader/Skeleton";

export default function PicturesDisplaySkeleton(): ReactElement {
  return (
    <div className="grid grid-cols[1fr_1fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr] lg:auto-rows-[1fr_1fr] gap-2">
      <div className="col-span-4 lg:col-span-1 row-span-1 lg:row-span-2 mb-1 mt-1">
        <Skeleton className="h-40 lg:h-full w-full rounded-md" />
      </div>
      <div className="col-start-1 lg:col-start-2 row-start-2 lg:row-start-1 mb-1 mt-1">
        <Skeleton className="h-20 lg:h-full w-full rounded-md" />
      </div>
      <div className="col-start-2 lg:col-start-2 row-start-2 lg:row-start-2 mb-1 mt-1">
        <Skeleton className="h-20 lg:h-full w-full rounded-md" />
      </div>
      <div className="col-start-3 lg:col-start-3 row-start-2 lg:row-start-1 mb-1 mt-1">
        <Skeleton className="h-20 lg:h-full w-full rounded-md" />
      </div>
      <div className="col-start-4 lg:col-start-3 row-start-2 lg:row-start-2 mb-1 mt-1">
        <Skeleton className="h-20 lg:h-full w-full rounded-md" />
      </div>
    </div>
  );
}
