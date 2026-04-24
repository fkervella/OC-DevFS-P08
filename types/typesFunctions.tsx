// types/appTypes.ts (ou un fichier dédié aux conversions)
import { AppProperty } from "./appTypes";
import { BackendProperty } from "./backendApiTypes";

/**
 * convertBackendToAppProperty Convertit un tableau de BackendProperty en tableau de AppProperty.
 * Chaque élément du tableau est converti avec des valeurs par défaut pour les champs manquants.
 *
 * @param backendProperties - Tableau des données du backend.
 * @return AppProperty[] - Tableau des données adaptées pour le frontend.
 */

export function convertBackendToAppProperty(
  backendProperties: BackendProperty[],
): AppProperty[];

/**
 * convertBackendToAppProperty Convertit un BackendProperty en AppProperty.
 * Des valeurs par défaut sont affectées pour les champs manquants.
 *
 * @param {BackendProperty} backendProperty
 * @return {AppProperty}
 */

export function convertBackendToAppProperty(
  backendProperty: BackendProperty,
): AppProperty;

/**
 * convertBackendToAppProperty Convertit un tableau de BackendProperty en tableau de AppProperty ou un BackendProperty en AppProperty
 * Des valeurs par défaut sont affectées pour les champs manquants.
 *
 * @param {(BackendProperty | BackendProperty[])} backendData
 * @return {(AppProperty | AppProperty[])}
 */

export function convertBackendToAppProperty(
  backendData: BackendProperty | BackendProperty[],
): AppProperty | AppProperty[] {
  // Si c'est un tableau, chaque élément est mappé
  if (Array.isArray(backendData)) {
    return backendData.map((property) => ({
      ...property,
      favorite: false,
    }));
  }
  // Sinon, il s'agit d'un seul objet
  return {
    ...backendData,
    favorite: false,
  };
}
