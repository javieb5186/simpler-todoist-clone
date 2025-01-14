import { createContext } from "react";
import { DatabaseContextProps } from "./DatabaseProvider";

export const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined,
);