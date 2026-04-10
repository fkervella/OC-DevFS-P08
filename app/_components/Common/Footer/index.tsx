import Image from "next/image";
import { ReactElement } from "react";

/**
 * Footer affiche le footer sur les pages le nécessitant
 *
 * @returns {string} Code HTML du footer
 */

export default function Footer(): ReactElement {
  return (
    <footer
      role="contentinfo"
      className="bg-white flex flex-col lg:flex-row lg:justify-between gap-2 items-center pt-5 pr-10 pb-5 pl-10"
    >
      <Image src="/logoSimple.png" alt="Logo Kasa" width={47} height={54} />
      <div className="text-base font-normal text-black-font">
        © 2026 Kasa. All rights reserved
      </div>
    </footer>
  );
}
