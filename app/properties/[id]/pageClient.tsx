"use client";

import { redirect } from "next/navigation";
import { ReactElement } from "react";

import Button from "@/app/_components/Common/Button";
import HostInfos from "@/app/_components/Common/HostInfos";
import PicturesDisplay from "@/app/_components/Common/PicturesDisplay";
import PropertyInfos from "@/app/_components/Common/PropertyInfos";
import { AppProperty } from "@/types/appTypes";

export interface PropertyClientProps {
  property: AppProperty;
}

export default function PropertyClient({
  property,
}: PropertyClientProps): ReactElement {
  const handleGoBackClick = () => {
    redirect("/properties");
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        text="← Retour aux annonces"
        type="button"
        onClick={handleGoBackClick}
        className="bg-grayLight p-2 text-nowrap w-fit text-sm font-medium text-grayDark"
        disabled={false}
      />
      <div className="grid grid-cols-[2fr_1fr] grid-rows-2 gap-2 mb-8">
        <PicturesDisplay property={property} />
        <HostInfos property={property} />
        <PropertyInfos property={property} />
      </div>
    </div>
  );
}
