// app/_components/Common/HowDoesItWorksCardSkeleton.tsx
import { ReactElement } from "react";

import Skeleton from "@/app/_components/Loader/Skeleton";

export default function HowDoesItWorksCardSkeleton(): ReactElement {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
      <Skeleton className="h-8 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
