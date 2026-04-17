"use client";

import Image from "next/image";
import { ReactElement, useCallback, useEffect, useState } from "react";

import { AppProperty } from "@/types/appTypes";

export interface PicturesCarouselModalContentProps {
  property: AppProperty;
  onSubmitSuccess: () => void;
}
/**
 * CreateProjectModalContent Composant d'afficahge du contenu de la modale de création de projet
 *
 * @param {Function} onSubmitSuccess action à réaliser à la soumission du formulaire
 * @return {string} Code HTML du formulaire de création de projet
 */

export default function PicturesCarouselModalContent({
  property,
}: PicturesCarouselModalContentProps): ReactElement {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const goToIndex = useCallback((newIndex: number) => {
    setSelectedImageIndex(newIndex);
  }, []);

  // Changement d'image à la souris
  const handlePictureClick = (index: number) => {
    goToIndex(index);
  };

  // Changement d'image au clavier
  const handleImageChange = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        const newIndex =
          selectedImageIndex + 1 >= property.pictures.length
            ? 0
            : selectedImageIndex + 1;
        goToIndex(newIndex);
      } else if (event.key === "ArrowLeft") {
        const newIndex =
          selectedImageIndex - 1 < 0
            ? property.pictures.length - 1
            : selectedImageIndex - 1;
        goToIndex(newIndex);
      }
    },
    [selectedImageIndex, property.pictures, goToIndex],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleImageChange);
    return () => {
      document.removeEventListener("keydown", handleImageChange);
    };
  }, [handleImageChange]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative w-full h-[70vh] overflow-hidden shrink-0">
        <div className={`flex flex-row gap-2`}>
          {property.pictures.map((picture: string, index: number) => {
            const visibility = index === selectedImageIndex ? "" : "hidden";

            return (
              <Image
                key={index}
                src={picture}
                alt=""
                fill
                className={`rounded-lg object-contain ${visibility}`}
                loading="eager"
                sizes="(max-width: 768px) 90vw,"
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-row gap-2 flex-wrap w-full items-center justify-center">
        {property.pictures.map((picture: string, index: number) => {
          const border =
            selectedImageIndex === index ? "border-4 border-mainRed" : "";

          return (
            <button key={picture} onClick={() => handlePictureClick(index)}>
              <Image
                src={picture}
                alt={`Image secondaire ${index + 1} de ${property.title}`}
                width={82}
                height={82}
                className={`w-20 h-20 rounded-md object-cover ${border} transition-all duration-200`}
                loading="eager"
                sizes="(max-width: 768px) 100vw, 82px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
