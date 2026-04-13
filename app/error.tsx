"use client";
import "@/app/globals.css";

//import { ErrorProps } from 'next/error';
import { redirect } from "next/navigation";
import { ReactElement, useEffect } from "react";

import Button from "./_components/Common/Button";

/**
 * ErrorProps type de données en entrée du composant Error
 *
 * @interface ErrorProps
 * @typedef {ErrorProps}
 */

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * ErrorPage Affichage de la page d'erreur
 *
 * @return {ReactElement} code HTML de la page d'erreur
 */

export default function ErrorPage({ error, reset }: ErrorProps): ReactElement {
  useEffect(() => {
    // Log complet côté client pour le debug
    console.error("[ErrorBoundary] error:", error);
    console.error("[ErrorBoundary] name:", error.name);
    console.error("[ErrorBoundary] message:", error.message);
    console.error("[ErrorBoundary] digest:", error.digest);
    console.error("[ErrorBoundary] stack:", error.stack);
    // Extraction récursive des causes (ex: fetch failed → cause: ConnectRefused)
    if (error.cause) console.error("[ErrorBoundary] cause:", error.cause);
  }, [error]);

  // Extraction de la cause profonde pour affichage utilisateur
  const rootCause =
    error.cause instanceof Error
      ? error.cause.message
      : error.cause
        ? String(error.cause)
        : null;

  const handleButtonClick = (buttonAction: string) => {
    redirect(`/${buttonAction}`);
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center w-90">
        <p className="text-center mb-5">Une erreur est survenue</p>

        {/* Type d'erreur */}
        <div className="text-mainRed text-2xl font-medium">
          {error.name ?? "Erreur inconnue"}
        </div>

        {/* Message principal */}
        {error.message && <p className="text-center mb-2">{error.message}</p>}

        {/* Cause profonde */}
        {rootCause && (
          <p className="text-center text-sm text-grayDark mb-2">
            Cause : {rootCause}
          </p>
        )}

        {/* digest : identifiant Next.js de l'erreur serveur, pour croiser avec les logs */}
        {error.digest && (
          <p className="text-center text-xs text-grayDark mb-5">
            Référence : {error.digest}
          </p>
        )}

        {/* Bouton reset — retente le rendu du segment sans recharger la page */}
        <Button
          text="Réessayer"
          type="button"
          className="bg-mainRed text-white"
          onClick={reset}
        />

        <Button
          text="Accueil"
          type="button"
          className="bg-mainRed text-white"
          onClick={() => handleButtonClick("home")}
        />
        <Button
          text="Logements"
          type="button"
          className="bg-mainRed text-white"
          onClick={() => handleButtonClick("properties")}
        />
      </div>
    </div>
  );
}
