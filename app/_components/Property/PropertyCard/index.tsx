import Image from "next/image";
import { ReactElement } from "react";

import FavoriteButton from "@/app/_components/Common/FavoriteButton";
import { AppProperty } from "@/types/appTypes";

interface PropertyCardProps {
  propertyData: AppProperty;
}

export default function PropertyCard({
  propertyData,
}: PropertyCardProps): ReactElement {
  const handleFavoriteClick = () => {
    //TODO
  };
  return (
    <a href={`/property/${propertyData.id}`}>
      <div className="flex flex-col gap-2 bg-white relative w-89">
        <div className="relative h-94 w-89">
          <Image
            src={propertyData.cover}
            alt={`image ${propertyData.title}`}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 355px) 100vw, 33vw"
          />
        </div>
        <div className="absolute top-4 right-4">
          <FavoriteButton
            isFavorite={propertyData.favorite}
            onToggle={() => handleFavoriteClick()}
          />
        </div>
        <div className="flex flex-col gap-2 pt-2 pr-4 pb-5 pl-4 justify-between h-44">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-medium text-wrap">
              {propertyData.title}
            </div>
            <div className="text-sm font-normal text-grayDark">
              {propertyData.location}
            </div>
          </div>
          <div className="text-sm font-medium text-black">
            {propertyData.price_per_night}€
            <span className="text-sm font-normal text-grayDark"> par nuit</span>
          </div>
        </div>
      </div>
    </a>
  );
}
