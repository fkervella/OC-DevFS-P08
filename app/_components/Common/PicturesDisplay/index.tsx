import Image from "next/image";
import { ReactElement } from "react";

import { AppProperty } from "@/types/appTypes";

export interface PicturesDisplayProps {
  property: AppProperty; // données d'une propriété
}
export default function PicturesDisplay({
  property,
}: PicturesDisplayProps): ReactElement {
  return (
    <div className="grid grid-cols[1fr_1fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr] lg:auto-rows-[1fr_1fr] gap-2">
      {/* Image principale (colonne 1, lignes 1-2) */}
      {property.pictures[0] && (
        <div className="col-span-4 lg:col-span-1 row-span-1 lg:row-span-2">
          <Image
            src={property.pictures[0]}
            alt={`Image principale de ${property.title}`}
            width={82}
            height={170}
            className="w-full h-full rounded-md object-cover"
            loading="eager"
            sizes="(max-width: 768px) 100vw, auto"
          />
        </div>
      )}

      {/* Images secondaires (colonnes 2-3, lignes 1-2) */}
      {property.pictures.slice(1, 5).map((picture: string, index: number) => {
        const positionClass =
          index === 0
            ? "col-start-1 lg:col-start-2 row-start-2 lg:row-start-1"
            : index === 1
              ? "col-start-2 lg:col-start-2 row-start-2 lg:row-start-2"
              : index === 2
                ? "col-start-3 lg:col-start-3 row-start-2 lg:row-start-1"
                : "col-start-4 lg:col-start-3 row-start-2 lg:row-start-2";

        return (
          <div key={picture} className={positionClass}>
            <Image
              src={picture}
              alt={`Image secondaire ${index + 1} de ${property.title}`}
              width={82}
              height={82}
              className="w-full h-full rounded-md object-cover"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 82px"
            />
          </div>
        );
      })}
    </div>
  );
}
