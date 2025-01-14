import { useContext } from "react";
import { DatabaseContextProps } from "../contexts/DatabaseProvider";
import { DatabaseContext } from "../contexts/DatabaseContext";

export const useDatabase = (): DatabaseContextProps => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};