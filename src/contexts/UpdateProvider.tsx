import { createContext, Dispatch, ReactNode, useState } from "react";

export type UpdateContextProps = [
  boolean,
  Dispatch<React.SetStateAction<boolean>>,
];

interface Props {
  children: ReactNode;
}

export const UpdateContext = createContext<UpdateContextProps | null>(null);

export default function UpdateProvider({ children }: Props) {
  const [update, setUpdate] = useState(false);
  return (
    <UpdateContext.Provider value={[update, setUpdate]}>
      {children}
    </UpdateContext.Provider>
  );
}
