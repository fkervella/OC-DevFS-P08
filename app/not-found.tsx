"use client";

import { redirect } from "next/navigation";

import Button from "./_components/Common/Button";

export default function NotFound() {
  const handleButtonClick = (buttonAction: string) => {
    redirect(`/${buttonAction}`);
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center w-90">
        <div className="text-mainRed text-8xl font-black">404</div>
        <div className="text-center mb-5">
          Il semble que la page que vous cherchez ait pris des vacances ... ou
          n&apos;ait jamais existé
        </div>
        <Button
          name="Accueil"
          className="bg-mainRed text-white"
          onClick={() => handleButtonClick("home")}
        />
        <Button
          name="Logements"
          className="bg-mainRed text-white"
          onClick={() => handleButtonClick("properties")}
        />
      </div>
    </div>
  );
}
