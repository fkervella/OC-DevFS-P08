"use client";

import { RefObject, useEffect, useRef } from "react";

export interface UseFocusTrapProps {
  isActive: boolean;
}

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function useFocusTrap({
  isActive,
}: UseFocusTrapProps): RefObject<HTMLElement | null> {
  const containerRef = useRef<HTMLElement>(null);
  // Mémorise l'élément qui avait le focus avant l'ouverture
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Sauvegarde l'élément actuellement focalisé
    previousFocusRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // Récupère tous les éléments focusables dans la modale
    const getFocusableElements = (): HTMLElement[] =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      ).filter((el) => !el.closest('[aria-hidden="true"]'));

    // Met le focus sur le premier élément focusable
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab : si on est sur le premier, on va au dernier
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab : si on est sur le dernier, on revient au premier
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      // Restitue le focus à l'élément d'origine à la fermeture
      if (previousFocusRef.current) {
        previousFocusRef.current?.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}
