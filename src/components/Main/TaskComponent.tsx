import { useState, useEffect } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import useWindowWidth from "../../hooks/useWindowWidth";
import { Database } from "sql.js";
import saveDatabaseToLocalStorage from "../../utils/saveDatabaseToLocalStorage";

interface TaskProps {
  taskId: number;
  title: string;
  description: string;
  categoryId: number;
  view: "list" | "board";
  onClickCallback?: () => void;
}

function updateCompleted(database: Database | null, taskId: number) {
  try {
    const db = database;
    if (db) {
      db.run("UPDATE tasks SET is_completed = ? WHERE id = ?", [1, taskId]);
      saveDatabaseToLocalStorage(db);
    }
  } catch (error) {
    if (error) console.log(error);
  }
}

const TaskComponent = ({
  taskId,
  title,
  description,
  categoryId,
  view,
  onClickCallback,
}: TaskProps) => {
  const { db } = useDatabase();
  const width = useWindowWidth();
  const [categoryStr, setCategoryStr] = useState("");
  const [hover, setHover] = useState(false);
  const [contentHover, setContentHover] = useState(false);

  const handleCompleted = () => {
    updateCompleted(db, taskId);
    if (onClickCallback) onClickCallback();
  };

  // Get category based on id and display
  useEffect(() => {
    try {
      if (db) {
        const res = db.exec("SELECT name FROM task_categories WHERE id = $id", {
          $id: categoryId,
        });
        const str = String(res[0].values[0][0]);
        const capitializeStr = str[0].toUpperCase() + str.slice(1);
        setCategoryStr(capitializeStr);
      }
    } catch (error) {
      if (error) console.log(error);
    }
  }, [categoryId, db]);

  return (
    <div
      className={`relative flex w-full items-start justify-start gap-x-2 ${view === "list" ? "border-b border-neutral-400" : "max-w-[20rem] rounded border border-neutral-800 p-2 drop-shadow"}`}
    >
      <button
        onClick={handleCompleted}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <svg
            className="h-6 w-5 fill-[#DC4C3E] pt-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license/free Copyright 2025
            Fonticons, Inc.
            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
          </svg>
        ) : (
          <svg
            className="h-6 w-5 pt-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license/free Copyright 2025
            Fonticons, Inc.
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
          </svg>
        )}
      </button>
      <div
        className="flex w-full flex-col gap-y-4 text-left"
        onMouseOver={() => setContentHover(true)}
        onMouseLeave={() => setContentHover(false)}
      >
        <div className="flex items-start justify-between">
          <h2 className={"flex-shrink text-xl font-medium"}>{title}</h2>
          <div
            className={`flex flex-none space-x-2 *:px-2 *:py-1 ${contentHover || width < 640 ? "block" : "hidden"}`}
          >
            {view === "list" ? (
              <>
                <button className="hidden rounded hover:bg-neutral-300 sm:block">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    Font Awesome Free 6.7.2 by @fontawesome -
                    https://fontawesome.com License -
                    https://fontawesome.com/license/free Copyright 2025
                    Fonticons, Inc.
                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                  </svg>
                </button>
                <button className="hidden rounded hover:bg-neutral-300 sm:block">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    Font Awesome Free 6.7.2 by @fontawesome -
                    https://fontawesome.com License -
                    https://fontawesome.com/license/free Copyright 2025
                    Fonticons, Inc.
                    <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
                  </svg>
                </button>
                <button className="hidden rounded hover:bg-neutral-300 sm:block">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    Font Awesome Free 6.7.2 by @fontawesome -
                    https://fontawesome.com License -
                    https://fontawesome.com/license/free Copyright 2025
                    Fonticons, Inc.
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                </button>
                <button className="block sm:hidden">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    Font Awesome Free 6.7.2 by @fontawesome -
                    https://fontawesome.com License -
                    https://fontawesome.com/license/free Copyright 2025
                    Fonticons, Inc.
                    <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                  </svg>
                </button>
              </>
            ) : (
              <button>
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  Font Awesome Free 6.7.2 by @fontawesome -
                  https://fontawesome.com License -
                  https://fontawesome.com/license/free Copyright 2025 Fonticons,
                  Inc.
                  <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <p>{description}</p>
        <span className="self-end">{categoryStr}</span>
      </div>
    </div>
  );
};

export default TaskComponent;
