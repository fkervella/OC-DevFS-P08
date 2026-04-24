"use client";

import Image from "next/image";
import { ReactElement, useCallback, useEffect, useState } from "react";

import { AppProperty } from "@/types/appTypes";

/**
 * PicturesCarouselModalContentProps pros du carousel
 *
 * @interface PicturesCarouselModalContentProps
 * @typedef {PicturesCarouselModalContentProps}
 */
export interface PicturesCarouselModalContentProps {
  property: AppProperty; // données de la propriété
  onSubmitSuccess: () => void; // action à réaliser à la fermeture de la modale
}

/**
 * PicturesCarouselModalContent carousel à afficher
 *
 * @return {ReactElement} Code HTML du carousel
 */

export default function PicturesCarouselModalContent({
  property,
}: PicturesCarouselModalContentProps): ReactElement {
  // Données des propriétés à afficher
  const pictures = property.pictures;
  const total = pictures.length;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Index de l'image affichée
  const [offset, setOffset] = useState(0); // offset de translation pour l'animation (en %)
  const [isAnimating, setIsAnimating] = useState(false); // état de l'animation pour empĉher les changements pendant une animation
  const [transition, setTransition] = useState(""); // style CSS utilisé pendant l'animation

  // Slots affichés dans la bande : [gauche, centre, droite]
  // Par défaut : [prev, current, next]
  const [slots, setSlots] = useState([
    (0 - 1 + total) % total, // slot gauche (image précédente)
    0, // slot central (image affichée)
    (0 + 1) % total, // slot droite (image suivante)
  ]);

  // Changement de l'image à afficher avec identification de la direction(gauche ou droite)
  const goToIndex = useCallback(
    (newIndex: number) => {
      // Empêche les changements pendant une animation en cours ou si l'image n'a pas changé
      if (isAnimating || newIndex === selectedImageIndex) return;

      // Détermine la direction visuelle en comparaison des positions dans le tableau des images
      const distForward = (newIndex - selectedImageIndex + total) % total; // distance, en allant vers la droite, entre l'élément actuel et l'élément demandé dans le tableau des images
      const distBackward = (selectedImageIndex - newIndex + total) % total; // distance, en allant vers la gauche, entre l'élément actuel et l'élément demandé dans le tableau des images
      const direction = distForward <= distBackward ? "right" : "left"; // Conservation de la distance la plus courte, avec défilement vers la droite si égalité

      // Construction des slots suivant la direction de défilement définie :
      // [image-qui-sort-du-côté-opposé, actuelle, cible]
      // ou [cible, actuelle, image-qui-sort-du-côté-opposé]
      if (direction === "right") {
        // L'ordre est : [image-qui-sort-du-côté-opposé, actuelle, cible]
        setSlots([selectedImageIndex, selectedImageIndex, newIndex]);
      } else {
        // L'ordre est : [cible, actuelle, image-qui-sort-du-côté-opposé]
        setSlots([newIndex, selectedImageIndex, selectedImageIndex]);
      }

      // offset pour de l'image pour l'animation
      // translation vers la gauche : -100%
      // translation vers la droite : +100%
      const targetOffset = direction === "right" ? -100 : 100;

      // Démarrage de l'animation
      setIsAnimating(true);
      setTransition("transform 0.35s ease-in-out");
      setOffset(targetOffset);

      // Réinitialisation à l'issue de l'écoulement du temps de l'animation
      setTimeout(() => {
        setTransition(""); // retrait de l'animation
        setOffset(0); // reset de l'offset
        setSelectedImageIndex(newIndex); // mise à jour de l'image sélectionnée
        // Remet les slots à leur état initial une fois la transition terminée
        setSlots([
          (newIndex - 1 + total) % total,
          newIndex,
          (newIndex + 1) % total,
        ]);
        setIsAnimating(false); // Réinitialisation pour le permettre une nouvelle animation
      }, 350);
    },
    [isAnimating, selectedImageIndex, total],
  );

  // Affichage de l'image suivante
  const nextSlide = useCallback(() => {
    goToIndex((selectedImageIndex + 1) % total);
  }, [selectedImageIndex, total, goToIndex]);

  // Affichage de l'image précédente
  const previousSlide = useCallback(() => {
    goToIndex((selectedImageIndex - 1 + total) % total);
  }, [selectedImageIndex, total, goToIndex]);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") previousSlide();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide]);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Zone carousel */}
      <div className="relative w-full h-[70vh] overflow-hidden shrink-0">
        {property.pictures.length > 1 && (
          <>
            <button
              onClick={previousSlide}
              disabled={isAnimating}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl cursor-pointer"
              aria-label="Image précédente"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl cursor-pointer"
              aria-label="Image suivante"
            >
              ›
            </button>
          </>
        )}
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(calc(-100% + ${offset}%))`,
            transition,
            willChange: "transform",
          }}
        >
          {slots.map((pictureIndex, slotPosition) => (
            <div key={slotPosition} className="relative shrink-0 w-full h-full">
              <Image
                src={pictures[pictureIndex]}
                alt={`Image ${pictureIndex + 1} de ${property.title}`}
                fill
                className="object-contain rounded-lg"
                loading="eager"
                sizes="(max-width: 768px) 90vw, 80vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Miniatures */}
      <div className="flex flex-row gap-2 flex-wrap w-full items-center justify-center">
        {pictures.map((picture: string, index: number) => (
          <button
            key={picture}
            onClick={() => goToIndex(index)}
            className="cursor-pointer"
          >
            <Image
              src={picture}
              alt={`Image secondaire ${index + 1} de ${property.title}`}
              width={82}
              height={82}
              className={`w-20 h-20 rounded-md object-cover transition-all duration-200 ${
                selectedImageIndex === index ? "border-4 border-mainRed" : ""
              }`}
              loading="eager"
              sizes="(max-width: 768px) 100vw, 82px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
