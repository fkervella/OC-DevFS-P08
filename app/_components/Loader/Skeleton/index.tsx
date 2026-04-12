// app/_components/Common/Skeleton.tsx
import { ReactElement } from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({
  className = "",
  width,
  height,
}: SkeletonProps): ReactElement {
  return (
    <div
      className={`animate-pulse bg-grayDark rounded ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
