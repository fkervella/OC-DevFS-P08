import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

import Button from "@/app/_components/Common/Button";
import Stars from "@/app/_components/Common/Stars";
import { AppProperty } from "@/types/appTypes";

export interface HostInfosProps {
  property: AppProperty; // données d'une propriété
  className: string;
}

export default function HostInfos({
  property,
  className,
}: HostInfosProps): ReactElement {
  const handleHostContactClick = () => {
    redirect("mailto:host@example.com");
  };

  const handleSendMessageClick = () => {
    redirect("/chat");
  };

  return (
    <div
      className={`bg-white rounded-lg pt-6 pr-4 pb-6 pl-6 flex flex-col gap-2 h-fit ${className}`}
    >
      <h2 className="text-base font-medium text-black">Votre hôte</h2>
      <div className="flex flex-row justify-between mb-4 items-center">
        <Image
          src={property.host.picture}
          alt={`Avatar de ${property.host.name}`}
          width={82}
          height={82}
          className="w-full h-auto max-h-20 max-w-20  rounded-md object-fit"
          loading="lazy"
          sizes="(max-width: 82px) 100vw, (max-width: 82px) 80vw, 82px"
        />
        <p className="text-normal font-medium text-black">
          {property.host.name}
        </p>
        <Stars number={1} /> {/* TODO */}
      </div>
      <Button
        text="Contacter l'hôte"
        type="button"
        className="bg-mainRed rounded-lg text-white font-medium text-sm w-full"
        onClick={handleHostContactClick}
        disabled={false}
      />
      <Button
        text="Envoyer un message"
        type="button"
        className="bg-mainRed rounded-lg text-white font-medium text-sm w-full"
        onClick={handleSendMessageClick}
        disabled={false}
      />
    </div>
  );
}
