// types/appTypes.ts (ou un fichier dédié aux conversions)
import { AppProperty } from "./appTypes";
import { BackendProperty } from "./backendApiTypes";

/**
 * Convertit un tableau de BackendProperty en tableau de AppProperty.
 * Chaque élément du tableau est converti avec des valeurs par défaut pour les champs manquants.
 *
 * @param backendProperties - Tableau des données du backend.
 * @return AppProperty[] - Tableau des données adaptées pour le frontend.
 */

export function convertBackendToAppProperty(
  backendProperties: BackendProperty[],
): AppProperty[];

export function convertBackendToAppProperty(
  backendProperty: BackendProperty,
): AppProperty;

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
