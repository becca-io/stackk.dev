import {
  cloneElement,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import useBoolean from './useBoolean';

interface ModalContextValue {
  open(modalNode: ReactNode): void;
  close(): void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export function ModalProvider({ children }: Props) {
  const [isOpen, openModal, close] = useBoolean(false);
  const [modalNode, setModalNode] = useState<ReactNode>(null);

  const open = (modal: ReactNode) => {
    setModalNode(modal);
    openModal();
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {isValidElement(modalNode)
        ? cloneElement(modalNode, {
            onClose: close,
            ...modalNode.props,
            open: isOpen,
          })
        : null}
    </ModalContext.Provider>
  );
}

export default function useModal() {
  return useContext(ModalContext);
}
