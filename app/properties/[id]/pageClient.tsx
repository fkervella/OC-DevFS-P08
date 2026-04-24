"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

import Button from "@/app/_components/Common/Button";
import HostInfos from "@/app/_components/Common/HostInfos";
import PicturesDisplay from "@/app/_components/Common/PicturesDisplay";
import PropertyInfos from "@/app/_components/Common/PropertyInfos";
import useModal from "@/hooks/useModal";
import { AppProperty } from "@/types/appTypes";

// Chargement des données lorsqu'elles ont besoin d'être affichées
const ModalLayout = dynamic(
  () => import("@/app/_components/Modal/ModalLayout"),
  { ssr: false },
);

// Chargement des données lorsqu'elles ont besoin d'être affichées
const PicturesCarouselModalContent = dynamic(
  () => import("@/app/_components/Property/PicturesCarouselModalContent"),
  { ssr: false },
);

export interface PropertyClientProps {
  property: AppProperty; // données de la propriété
}

export default function PropertyClient({
  property,
}: PropertyClientProps): ReactElement {
  const { modalState, openModal, closeModal, renderContent } = useModal();
  const router = useRouter();

  const handleGoBackClick = () => {
    router.push("/properties");
  };

  // Action de cette page à l'issue de la consulltation des images : fermeture de la popup
  const handleCloseModal = async () => {
    closeModal();
  };

  return (
    <>
      <div className="flex flex-col gap-2 inert={modalState.isOpen} m-4 lg:mt-4">
        <Button
          text="← Retour aux annonces"
          type="button"
          onClick={handleGoBackClick}
          className="bg-grayLight text-nowrap w-fit text-sm font-medium text-grayDark cursor-pointer"
          disabled={false}
        />

        <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-2 lg:mb-8">
          <button
            onClick={() =>
              openModal(
                property.title,
                <PicturesCarouselModalContent
                  property={property}
                  onSubmitSuccess={handleCloseModal}
                />,
              )
            }
            className="p-0 m-0 cursor-pointer"
            aria-label={`Voir toutes les photos de ${property.title}`}
          >
            <PicturesDisplay property={property} />
          </button>

          <PropertyInfos
            property={property}
            className="lg:col-start-1 lg:row-start-2"
          />

          <HostInfos
            property={property}
            className="lg:col-start-2 lg:row-start-1"
          />
        </div>
      </div>
      {/* Modale générique */}
      <ModalLayout
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
      >
        {renderContent()}
      </ModalLayout>
    </>
  );
}
