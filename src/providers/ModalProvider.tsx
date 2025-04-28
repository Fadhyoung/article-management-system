'use client';

import { createContext, useContext, useState } from 'react';

interface ModalState {
  // MODAL STATE
  isOpen: boolean;
  setIsOpen: (key: boolean) => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalState>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useModalProvider = () => useContext(ModalContext);

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
