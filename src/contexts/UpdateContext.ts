import { useContext } from "react";
import { UpdateContext, UpdateContextProps } from "./UpdateProvider";

export const useUpdate = (): UpdateContextProps => {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
