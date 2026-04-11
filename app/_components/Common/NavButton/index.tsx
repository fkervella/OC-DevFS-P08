import Link from "next/link";
import { ReactElement } from "react";

interface NavButtonProps {
  name: string; // texte à afficher
  page: string; // lien vers lequel naviguer
  isActive: boolean; // conditions pour indiquer que c'est la page active
  className?: string; // style d'affichage
}

/**
 * NavButton bouton de navigation pour le header
 *
 * @export
 * @param {NavButtonProps} props Props définies par l'interface NaButtonProps
 * @returns {ReactElement} code HTML du bouton
 */

export default function NavButton({
  name,
  page,
  isActive,
  className,
}: NavButtonProps): ReactElement {
  const text = isActive ? "font-bold text-mainRed" : "font-normal text-black";
  const additionalStyle = className ? className : "text-sm";

  return (
    <Link href={page} className={`inter ${text} ${additionalStyle}`}>
      {name}
    </Link>
  );
}
