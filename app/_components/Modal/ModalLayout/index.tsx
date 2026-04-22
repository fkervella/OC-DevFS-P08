"use client";

import { ReactNode, useEffect } from "react";

import { useFocusTrap } from "@/hooks/useFocusTrap";

export interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function ModalLayout({
  isOpen,
  onClose,
  title,
  children,
}: ModalLayoutProps) {
  const modalRef = useFocusTrap({
    isActive: isOpen,
  }) as React.RefObject<HTMLDivElement>;

  // Ferme la modale en cliquant en dehors ou avec la touche Échap
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Fermeture de la modale par la touche Echap
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Désactive le scroll du body
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto"; // Réactive le scroll du body
    };
  }, [isOpen, onClose, modalRef]);

  // Si la modale est fermée, il n'y a rien à afficher
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white w-full h-screen flex flex-col transform transition-all duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* En-tête de la modale */}
        <div className="flex justify-between items-center p-4 ">
          <h2 id="modal-title" className="text-xl font-bold text-black-font">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer p-2 rounded-full hover:bg-grayLight"
            aria-label="Fermer la modale"
          >
            X
          </button>
        </div>

        {/* Contenu dynamique de la modale */}
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
}
