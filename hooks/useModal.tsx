import { ReactNode, useCallback, useState } from "react";

/**
 * useModal hook de gestion de l'état d'une modale
 *
 * @return {{ modalState: any; openModal: (title: any, content: any) => void; closeModal: () => void; }}
 */

interface ModalState<T = ReactNode> {
  isOpen: boolean;
  title: string;
  content: T | null;
}

function useModal<T extends ReactNode = ReactNode>() {
  // Etat de la modale
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: "",
    content: null,
  });

  // mise à jour de l'état de la modale à l'ouverture de la modale
  const openModal = useCallback((title: string, content: T) => {
    setModalState({ isOpen: true, title, content });
  }, []);

  // fermeture de la modale à la fermeture de la modale
  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, title: "", content: null });
  }, []);

  // contenu de la modale
  const renderContent = (): ReactNode | null => {
    if (!modalState.content) return null;
    return typeof modalState.content === "function"
      ? (modalState.content as () => ReactNode)()
      : modalState.content;
  };

  return { modalState, openModal, closeModal, renderContent };
}

export default useModal;
