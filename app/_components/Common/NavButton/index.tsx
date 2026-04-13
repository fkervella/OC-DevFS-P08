import Link from "next/link";
import { ReactElement } from "react";

/**
 * NavButtonProps type de données en entrée du composant NavButton
 *
 * @interface NavButtonProps
 * @typedef {NavButtonProps}
 */

export interface NavButtonProps {
  name: string; // texte à afficher
  page: string; // lien vers lequel naviguer
  className?: string; // style d'affichage
}

/**
 * NavButton bouton de navigation pour le header
 *
 * @param {NavButtonProps} props Props définies par l'interface NaButtonProps
 * @return {ReactElement} code HTML du bouton
 */

export default function NavButton({
  name,
  page,
  className,
}: NavButtonProps): ReactElement {
  const additionalStyle = className ? className : "text-sm";

  return (
    <Link
      href={page}
      className={`inter font-normal text-black hover:font-bold hover:text-mainRed ${additionalStyle}`}
    >
      {name}
    </Link>
  );
}
