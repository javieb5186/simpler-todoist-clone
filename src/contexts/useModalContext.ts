import { useContext } from "react";
import { ModalContext, ModalContextProps } from "./ModalProvider";

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
