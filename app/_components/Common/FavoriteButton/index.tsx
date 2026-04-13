import { ReactElement, useState } from "react";

/**
 * FavoriteButtonProps type de données en entrée du composant FavoriteButton
 *
 * @interface FavoriteButtonProps
 * @typedef {FavoriteButtonProps}
 */
export interface FavoriteButtonProps {
  isFavorite?: boolean;
  onToggle?: (newState: boolean) => void;
}

/**
 * FavoriteButton
 *
 * @param {FavoriteButtonProps} param0 arguments pour l'affichage de FavoriteButtons
 * @param {boolean} [param0.isFavorite=false]
 * @param {(newState: boolean) => void} param0.onToggle
 * @return {ReactElement} Code HTML du bouton
 */

export default function FavoriteButton({
  isFavorite = false,
  onToggle,
}: FavoriteButtonProps): ReactElement {
  const style = isFavorite
    ? "bg-mainRed hover:bg-grayLight"
    : "bg-grayLight hover:bg-mainRed";
  const [favorite, setFavorite] = useState(isFavorite);

  function handleClick() {
    const next = !favorite;
    setFavorite(next);
    onToggle?.(next);
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-pressed={favorite}
      className={`group flex justify-center items-center w-10 h-10 rounded-lg transition-colors duration-100 ease-in-out cursor-pointer ${style}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4"
        aria-hidden="true"
      >
        {/*
          stroke        = bord du cœur   → toujours blanc
          fill          = fond du cœur   → gris clair → rose au hover
        */}
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          strokeWidth="1.5"
          className="
            stroke-white
            fill-grayDark group-hover:fill-pinkLight
            transition-colors duration-300 ease-in-out
          "
        />
      </svg>
    </button>
  );
}
