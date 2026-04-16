"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

import Button from "../Button";
import NavButton from "../NavButton";

/**
 * Header partie client renvoie le header du site
 *
 * @return {ReactElement}  Code HTML du header
 */

export default function HeaderClient(): ReactElement {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();

  const handleButtonClick = (buttonName: string) => {
    if (buttonName === "addProperty") router.push("/addProperty");
  };

  return (
    <header role="banner" className="flex justify-center lg:mt-5 lg:mb-5">
      {/* Barre de menu mobile first*/}
      <div className="flex flex-col w-full lg:hidden">
        <div className="flex flex-row lg:hidden justify-between items-center w-full pt-3 pr-5 pb-3 pl-5 bg-white-background ">
          <Image
            src="/logoSimple.png"
            alt="logo Kasa"
            width={47}
            height={54}
            className="h-12.5 w-auto"
          />

          {!isOpenMenu && (
            <button
              className="lg:hidden cursor-pointer z-50"
              onClick={() => setIsOpenMenu(true)}
              aria-label="Afficher/cacher le menu"
              aria-expanded={!isOpenMenu}
              aria-controls="nav-menu-mobile"
            >
              <Image
                src="/iconMenu.png" //TODO résolution de l'image
                alt="Ouvrir le menu"
                width={16}
                height={16}
                className="h-12.5 w-auto"
              />
            </button>
          )}

          {isOpenMenu && (
            <button
              className="lg:hidden cursor-pointer"
              onClick={() => setIsOpenMenu(false)}
              aria-label="Fermer le menu"
              aria-expanded={isOpenMenu}
              aria-controls="nav-menu"
            >
              <Image
                src="/iconClose.png" //TODO résolution de l'image
                alt="Fermer le menu"
                width={16}
                height={16}
                className="h-12.5 w-auto"
              />
            </button>
          )}
        </div>

        {/* Navigation mobile*/}
        {isOpenMenu && (
          <nav
            id="nav-menu-desktop"
            className="flex flex-col gap-5 items-start w-full pt-3 pr-5 pb-3 pl-5 bg-white-background shadow-lg"
          >
            <NavButton
              name="Aller à la page d'accueil"
              page="/properties"
              className="text-3xl pt-2 pb-2"
            />
            <NavButton
              name="Aller à la page à propos"
              page="/about"
              className="text-3xl pt-2 pb-2"
            />
            <NavButton
              name="Ouvrir la messagerie"
              page="/chat"
              className="text-3xl pt-2 pb-2"
            />
            <NavButton
              name="Voir mes favoris"
              page="/favorites"
              className="text-3xl pt-2 pb-2"
            />
            <Button
              text="Ajouter un logement"
              type="button"
              className="bg-mainRed text-white"
              onClick={() => handleButtonClick("addProperty")}
            />
          </nav>
        )}
      </div>

      {/* Navigation grand écran*/}
      <nav
        id="nav-menu"
        className=" hidden lg:flex flex-row gap-5 items-center w-fit pt-3 pr-25 pb-3 pl-25 bg-white-background rounded-lg"
      >
        <NavButton name="Accueil" page="/properties" />
        <NavButton name="A propos" page="/about" />
        <Image
          src="/logoComplet.png"
          alt="Logo Kasa"
          width={163}
          height={58}
          loading="eager"
          className="h-12.5 w-auto pr-5 pl-5"
        />
        <Link
          href="/addProperty"
          className="inter text-sm font-normal pr-5 text-mainRed"
        >
          + Ajouter un logement
        </Link>
        <Link href="/favorites">
          <Image
            src="/iconFavorite.png"
            alt="Voir mes favoris"
            width={16}
            height={16}
          />
        </Link>
        <div>|</div>
        <Link href="/chat">
          <Image
            src="/iconMessage.png"
            alt="Ouvrir la messagerie"
            width={16}
            height={16}
          />
        </Link>
      </nav>
    </header>
  );
}
