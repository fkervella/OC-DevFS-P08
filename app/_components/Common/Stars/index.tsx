import Image from "next/image";
import { ReactElement } from "react";

/**
 * ButtonProps type de données en entrée du composant Button
 *
 * @interface StarsProps
 * @typedef {StarsProps}
 */
export interface StarsProps {
  number: number; // nombre à afficher
}

/**
 * Stars affichage du nombre d'étoiles
 *
 * @param {StarsProps} props Props définies par l'interface StarsProps
 * @return {ReactElement} code HTML du bouton
 */

export default function Stars({ number }: StarsProps): ReactElement {
  return (
    <div className="rounded-lg pt-2 pr-2 pb-2 pl-2 h-fit bg-grayLight flex flex-rom gap-2 items-center">
      <Image
        src="/iconStar.png"
        alt=""
        width={16}
        height={16}
        className="h-5 w-auto"
      />
      <div className={`inter font-normal text-sm`}>{number}</div>
    </div>
  );
}
