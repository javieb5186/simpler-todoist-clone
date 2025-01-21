import { createContext, Dispatch, ReactNode, useState } from "react";

export type ModalContextProps = [
  modal: {
    addTask: boolean;
    search: boolean;
  },
  setModal: Dispatch<
    React.SetStateAction<{
      addTask: boolean;
      search: boolean;
    }>
  >,
];

interface Props {
  children: ReactNode;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export default function ModalProvider({ children }: Props) {
  const [modal, setModal] = useState({ addTask: false, search: false });
  return (
    <ModalContext.Provider value={[modal, setModal]}>
      {children}
    </ModalContext.Provider>
  );
}
