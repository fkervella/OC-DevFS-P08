"use client";

import Image from "next/image";
import { ReactElement, useCallback, useEffect, useState } from "react";

import { AppProperty } from "@/types/appTypes";

export interface PicturesCarouselModalContentProps {
  property: AppProperty;
  onSubmitSuccess: () => void;
}

export default function PicturesCarouselModalContent({
  property,
}: PicturesCarouselModalContentProps): ReactElement {
  const pictures = property.pictures;
  const total = pictures.length;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transition, setTransition] = useState("");

  // Slots affichés dans la bande : [gauche, centre, droite]
  // Par défaut : [prev, current, next]
  const [slots, setSlots] = useState([
    (0 - 1 + total) % total,
    0,
    (0 + 1) % total,
  ]);

  const goToIndex = useCallback(
    (newIndex: number) => {
      if (isAnimating || newIndex === selectedImageIndex) return;

      // Détermine la direction visuelle
      // On compare les positions dans le tableau de façon circulaire
      const distForward = (newIndex - selectedImageIndex + total) % total;
      const distBackward = (selectedImageIndex - newIndex + total) % total;
      const direction = distForward <= distBackward ? "right" : "left";

      // Construction des slots : [image-qui-sort-du-côté-opposé, actuelle, cible]
      // ou [cible, actuelle, image-qui-sort-du-côté-opposé]
      if (direction === "right") {
        // La bande est : [ quelconque | actuelle | cible ]
        // On translate vers la gauche (-100%) pour amener la cible
        setSlots([selectedImageIndex, selectedImageIndex, newIndex]);
      } else {
        // La bande est : [ cible | actuelle | quelconque ]
        // On translate vers la droite (+100%) pour amener la cible
        setSlots([newIndex, selectedImageIndex, selectedImageIndex]);
      }

      const targetOffset = direction === "right" ? -100 : 100;

      setIsAnimating(true);
      setTransition("transform 0.35s ease-in-out");
      setOffset(targetOffset);

      setTimeout(() => {
        setTransition("");
        setOffset(0);
        setSelectedImageIndex(newIndex);
        // Remet les slots normaux une fois la transition terminée
        setSlots([
          (newIndex - 1 + total) % total,
          newIndex,
          (newIndex + 1) % total,
        ]);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating, selectedImageIndex, total],
  );

  const nextSlide = useCallback(() => {
    goToIndex((selectedImageIndex + 1) % total);
  }, [selectedImageIndex, total, goToIndex]);

  const previousSlide = useCallback(() => {
    goToIndex((selectedImageIndex - 1 + total) % total);
  }, [selectedImageIndex, total, goToIndex]);

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
