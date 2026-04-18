// app/_components/Common/HowDoesItWorksCardSkeleton.tsx
import { ReactElement } from "react";

import Skeleton from "@/app/_components/Loader/Skeleton";

export default function PicturesDisplaySkeleton(): ReactElement {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] auto-rows-[1fr_1fr] gap-2">
      <div className="col-span-1 row-span-2">
        <Skeleton className="h-full w-full rounded-md" />
      </div>
      <div className="col-span-1 row-span-1">
        <Skeleton className="h-full w-full rounded-md col-start-2 row-start-1" />
      </div>
      <div className="col-span-1 row-span-1">
        <Skeleton className="h-full w-full rounded-md col-start-2 row-start-2" />
      </div>
      <div className="col-span-1 row-span-1">
        <Skeleton className="h-full w-full rounded-md col-start-3 row-start-1" />
      </div>
      <div className="col-span-1 row-span-1">
        <Skeleton className="h-full w-full rounded-md col-start-3 row-start-2" />
      </div>
    </div>
  );
}
