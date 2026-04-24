// app/_components/Common/Skeleton.tsx
import { ReactElement } from "react";

/**
 * SkeletonProps type de données en entrée du composant Skeleton
 *
 * @interface SkeletonProps
 * @typedef {SkeletonProps}
 */
export interface SkeletonProps {
  className?: string; // style de l'élément supérieur
  width?: string | number; // largeur de l'image
  height?: string | number; // hauteur de l'image
}

/**
 * Skeleton composant pour l'affichage du squelette de la page lors de son chargement
 *
 * @return {ReactElement} Code HTML du skeleton
 */

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
