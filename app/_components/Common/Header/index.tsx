//import { redirect } from 'next/navigation';
import { ReactElement } from "react";

//import { getSession } from '@/lib/session';
import HeaderClient from "./HeaderClient";

/**
 * Header partie serveur : récupère les informations de l'utilisateur et renvoie le Header partie client
 *
 * @async
 * @returns {ReactElement}
 */

export default async function Header(): Promise<ReactElement> {
  // Récupération de la session en cours et redirection vers la page de login si aucun utilisateur n'est connecté
  /*const token = await getSession();
  if (!token) redirect('/login'); Ne pas réactiver cette redirection vers login !!!*/

  return <HeaderClient />;
}
