"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

/**
 * Header partie client renvoie le header du site
 *
 * @returns {ReactElement}  Code HTML du header
 */

export default function HeaderClient(): ReactElement {
  return (
    <header role="banner" className="bg-white-background">
      {/* Navigation */}
      <nav id="nav-menu" className="">
        <Link href="/home">Accueil</Link>
        <Link href="/about">A propos</Link>
        <Image
          src="/logoComplet.png"
          alt="Logo Kasa"
          width={163}
          height={58}
          loading="eager"
        />
        <Link href="/addProperty">+ Ajouter un logement</Link>
        <Link href="/favorites">
          <Image src="/iconFavorite.png" alt="favoris" width={16} height={16} />
        </Link>
        <Link href="/chat">
          <Image
            src="/iconMessage.png"
            alt="Messagerie"
            width={16}
            height={16}
          />
        </Link>
      </nav>
    </header>
  );
}
