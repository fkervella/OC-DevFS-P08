"use client";

import { redirect } from "next/navigation";
import { ReactElement } from "react";

import Button from "@/app/_components/Common/Button";
import HostInfos from "@/app/_components/Common/HostInfos";
import PicturesDisplay from "@/app/_components/Common/PicturesDisplay";
import PropertyInfos from "@/app/_components/Common/PropertyInfos";
import ModalLayout from "@/app/_components/Modal/ModalLayout";
import PicturesCarouselModalContent from "@/app/_components/Property/PicturesCarouselModalContent";
import useModal from "@/hooks/useModal";
import { AppProperty } from "@/types/appTypes";

export interface PropertyClientProps {
  property: AppProperty;
}

export default function PropertyClient({
  property,
}: PropertyClientProps): ReactElement {
  const { modalState, openModal, closeModal, renderContent } = useModal();

  const handleGoBackClick = () => {
    redirect("/properties");
  };

  // Action de cette page à l'issue de la consulltation des images : fermeture de la popup
  const handleCloseModal = async () => {
    closeModal();
  };

  return (
    <>
      <div className="flex flex-col gap-2 inert={modalState.isOpen}">
        <Button
          text="← Retour aux annonces"
          type="button"
          onClick={handleGoBackClick}
          className="bg-grayLight text-nowrap w-fit text-sm font-medium text-grayDark cursor-pointer"
          disabled={false}
        />
        <div className="grid grid-cols-[2fr_1fr] gap-2 mb-8">
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
          >
            <PicturesDisplay property={property} />
          </button>
          <HostInfos property={property} />
          <PropertyInfos property={property} />
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
