import { ReactElement } from "react";

/**
 * HowDoesItWorksCardProps type de données en entrée du composant HowDoesItWorksCard
 *
 * @interface HowDoesItWorksCardProps
 * @typedef {HowDoesItWorksCardProps}
 */
export interface HowDoesItWorksCardProps {
  title: string; // titre à afficher
  description: string; // description à afficher
}

/**
 * HowDoesItWorksCard Affichage d'un rectagle de la section Comment ça marche
 *
 * @param {HowDoesItWorksCardProps} param0
 * @param {string} param0.title
 * @param {string} param0.description
 * @return {ReactElement} code HTML du composant
 */

export default function HowDoesItWorksCard({
  title,
  description,
}: HowDoesItWorksCardProps): ReactElement {
  return (
    <div className="bg-darkOrange rounded-lg w-60 h-40 pt-8 pr-4 pl-4 flex flex-col gap-2">
      <h3 className="font-medium text-lg text-white">{title}</h3>
      <p className="font-normal text-xs text-white">{description}</p>
    </div>
  );
}
