import initSqlJs, { Database } from "sql.js";

type PromiseDatabase = Database | null;

const loadDatabaseFromLocalStorage = async (): Promise<PromiseDatabase> => {
  const base64Binary = localStorage.getItem('todoist-db');
  if (base64Binary) {
    const binaryArray = Uint8Array.from(atob(base64Binary), c => c.charCodeAt(0));
    const SQL = await initSqlJs({
      locateFile: () => {
        return `/sql-wasm.wasm`;
      },
    });
    const db = new SQL.Database(binaryArray);
    return db;
  }
  return null;
};

export default loadDatabaseFromLocalStorage