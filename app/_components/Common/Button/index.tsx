import { ReactElement } from "react";

/**
 * ButtonProps type de données en entrée du composant Button
 *
 * @interface ButtonProps
 * @typedef {ButtonProps}
 */

export interface ButtonProps {
  text: string; // texte à afficher
  type: "submit" | "reset" | "button" | undefined; //type de bouton
  className?: string; // style d'affichage
  onClick?: () => void; // action à réaliser à l'appui sur le bouton
  disabled?: boolean; // désactivation du bouton
  "aria-live"?: "polite" | "assertive" | "off"; // type de mise à jour du bouton
  "aria-busy"?: boolean; // modification en cours du bouton
}

/**
 * Button bouton d'action
 *
 * @param {ButtonProps} props Props définies par l'interface ButtonProps
 * @return {ReactElement}
 */

/**
 * Button bouton d'action
 *
 * @param {ButtonProps} param0
 * @return {ReactElement} code HTML du bouton
 */

export default function Button({
  text,
  type,
  className,
  onClick,
  disabled,
  "aria-live": ariaLive,
  "aria-busy": ariaBusy,
}: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={`inter font-medium rounded-lg pt-2 pr-10 pb-2 pl-10 w-50 ${className} cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
      aria-live={ariaLive}
      aria-busy={ariaBusy}
    >
      {text}
    </button>
  );
}
