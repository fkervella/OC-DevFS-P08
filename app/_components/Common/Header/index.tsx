import { ReactElement } from "react";

import HeaderClient from "./HeaderClient";

/**
 * Header partie serveur : récupère les informations de l'utilisateur et renvoie le Header partie client
 *
 * @return {ReactElement}
 */

export default async function Header(): Promise<ReactElement> {
  return <HeaderClient />;
}
