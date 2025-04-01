import { ReactNode, useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js";
import { DatabaseContext } from "./DatabaseContext";
import loadDatabaseFromLocalStorage from "../utils/loadDatabaseFromLocalStorage";
import saveDatabaseToLocalStorage from "../utils/saveDatabaseToLocalStorage";

export interface DatabaseContextProps {
  db: Database | null;
  fetch: boolean;
  setFetch: () => void;
}

interface Props {
  children: ReactNode;
}

export const DatabaseProvider = ({ children }: Props) => {
  const [db, setDb] = useState<Database | null>(null);
  const [fetchDatabase, setFetchDatabase] = useState(false);

  // Load/Set/Save Database with some default data
  useEffect(() => {
    const setupDatabase = async () => {
      let database;
      try {
        database = await loadDatabaseFromLocalStorage();
        if (!database) {
          const SQL = await initSqlJs({
            locateFile: () => {
              return `/sql-wasm.wasm`;
            },
          });
          database = new SQL.Database();
          database.run(
            "CREATE TABLE IF NOT EXISTS task_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) NOT NULL UNIQUE);\
           INSERT INTO task_categories (name) VALUES('personal'),('work'),('other');\
           CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT, set_date DATE NOT NULL, set_time TIME, category_id INTEGER, is_completed INTEGER NOT NULL CHECK(is_completed IN (0,1)) DEFAULT 0, completed_date DATETIME, FOREIGN KEY (category_id) REFERENCES task_categories(id));\
           CREATE TABLE IF NOT EXISTS searches (id INTEGER PRIMARY KEY AUTOINCREMENT, search VARCHAR(255) NOT NULL);",
          );
          saveDatabaseToLocalStorage(database);
        }
        setDb(database);
      } catch (error) {}
    };

    setupDatabase();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        db,
        fetch: fetchDatabase,
        setFetch: () => setFetchDatabase(!fetchDatabase),
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
