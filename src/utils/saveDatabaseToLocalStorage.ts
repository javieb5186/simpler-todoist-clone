import { Database } from "sql.js";

const saveDatabaseToLocalStorage = (db: Database) => {
  const binaryArray = db.export();
  const base64Binary = btoa(
    String.fromCharCode(...new Uint8Array(binaryArray)),
  );
  localStorage.setItem("todoist-db", base64Binary);
};

export default saveDatabaseToLocalStorage;
