// app/_components/Common/HowDoesItWorksCardSkeleton.tsx
import { ReactElement } from "react";

import Skeleton from "@/app/_components/Loader/Skeleton";

export default function HostInfosSkeleton(): ReactElement {
  return (
    <div className="bg-white rounded-lg pt-6 pr-4 pb-6 pl-6 flex flex-col gap-2 h-fit">
      <Skeleton className="h-8 w-1/2" />
      <div className="flex flex-row justify-between mb-4 items-center">
        <Skeleton className="h-20 w-20" />
        <Skeleton className="h-10 w-30" />
        <Skeleton className="h-10 w-10" />
      </div>

      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
