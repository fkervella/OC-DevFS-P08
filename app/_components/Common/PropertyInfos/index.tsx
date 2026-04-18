import Image from "next/image";
import { ReactElement } from "react";

import PropertyItem from "@/app/_components/Common/PropertyItem";
import { AppProperty } from "@/types/appTypes";

export interface PropertyInfosProps {
  property: AppProperty; // données d'une propriété
}

export default function PropertyInfos({
  property,
}: PropertyInfosProps): ReactElement {
  return (
    <div className="bg-white rounded-lg pt-6 pr-4 pb-6 pl-6 flex flex-col gap-2">
      <h1 className="text-2xl font-medium text-black mb-2">{property.title}</h1>
      <div className="flex flex-row gap-2 items-center mb-6">
        <Image
          src="/iconLocalisation.png"
          alt="localisation"
          width={16}
          height={16}
          className="h-4 w-auto"
        />
        <p className="font-normal text-sm text-grayDark">{property.location}</p>
      </div>
      <p className="font-normal text-sm text-black mb-6">
        {property.description}
      </p>
      <h3 className="text-sm font-normal text-black mb-2">Equipements</h3>

      <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
        {property.equipments.map((equipment: string) => (
          <PropertyItem key={equipment} text={equipment} />
        ))}
      </div>
      <h3 className="text-sm font-normal text-black">Catéogries</h3>
      <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {property.tags.map((tag: string) => (
          <PropertyItem key={tag} text={tag} />
        ))}
      </div>
    </div>
  );
}
