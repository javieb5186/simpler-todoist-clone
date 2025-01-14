import { ReactNode, useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js";
import { DatabaseContext } from "./DatabaseContext";
import loadDatabaseFromLocalStorage from "../utils/loadDatabaseFromLocalStorage";
import saveDatabaseToLocalStorage from "../utils/saveDatabaseToLocalStorage";

export interface DatabaseContextProps {
  db: Database | null;
}

interface Props {
  children: ReactNode;
}

export const DatabaseProvider = ({ children }: Props) => {
  const [db, setDb] = useState<Database | null>(null);

  // Load/Set/Save Database with some default data
  useEffect(() => {
    const setupDatabase = async () => {
      let database;
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
           CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT, set_date DATE NOT NULL, set_time TIME, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES task_categories(id));\
           INSERT INTO tasks (title, description, set_date, category_id) VALUES('Complete coding assignment', 'Finish coding the project for the interview.', '2025-01-13', (SELECT id FROM task_categories WHERE name = 'work'));\
           INSERT INTO tasks (title, description, set_date, category_id) VALUES('Take out trash', 'Take out trash before I leave for work', '2025-01-13', (SELECT id FROM task_categories WHERE name = 'personal'));",
        );
        saveDatabaseToLocalStorage(database);
      }
      setDb(database);
    };

    setupDatabase();
  }, []);

  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  );
};
