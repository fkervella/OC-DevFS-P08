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
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: "",
    content: null,
  });

  const openModal = useCallback((title: string, content: T) => {
    setModalState({ isOpen: true, title, content });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, title: "", content: null });
  }, []);

  const renderContent = (): ReactNode | null => {
    if (!modalState.content) return null;
    return typeof modalState.content === "function"
      ? (modalState.content as () => ReactNode)()
      : modalState.content;
  };

  return { modalState, openModal, closeModal, renderContent };
}

export default useModal;
