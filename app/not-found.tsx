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
        <h1 className="text-mainRed text-8xl font-black">404</h1>
        <p className="text-center mb-5">
          Il semble que la page que vous cherchez ait pris des vacances ... ou
          n&apos;ait jamais existé
        </p>
        <Button
          text="Accueil"
          type="button"
          className="bg-mainRed text-white"
          onClick={() => handleButtonClick("home")}
        />
        <Button
          text="Logements"
          type="button"
          className="bg-mainRed text-white"
          onClick={() => handleButtonClick("properties")}
        />
      </div>
    </div>
  );
}
