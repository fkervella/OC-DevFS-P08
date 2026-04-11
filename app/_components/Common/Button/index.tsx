import { ReactElement } from "react";

interface ButtonProps {
  name: string; // texte à afficher
  className?: string; // style d'affichage
  onClick?: () => void; // action à réaliser à l'appui sur le bouton
}

/**
 * Button bouton d'action
 *
 * @export
 * @param {ButtonProps} props Props définies par l'interface ButtonProps
 * @returns {ReactElement} code HTML du bouton
 */

export default function Button({
  name,
  className,
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button
      className={`inter font-medium rounded-lg pt-2 pr-10 pb-2 pl-10 ${className}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
