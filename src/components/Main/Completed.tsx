import { useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { SqlValue } from "sql.js";
import saveDatabaseToLocalStorage from "../../utils/saveDatabaseToLocalStorage";

export default function Completed() {
  const { db } = useDatabase();
  const [completedTasks, setCompletedTasks] = useState<SqlValue[][]>();

  useEffect(() => {
    try {
      if (db) {
        const results = db.exec("SELECT * FROM tasks WHERE is_completed = ?", [
          1,
        ]);
        // In here check to see if the task is more than one week old
        const newResults = results[0].values.filter((task) => {
          const taskDate = String(task[7]).split(", ")[0].split("/");
          const checkDate = new Date(
            Number(taskDate[2]),
            Number(taskDate[0]) - 1,
            Number(taskDate[1]),
          );
          const currentDate = new Date();
          const reducedDate = currentDate.toLocaleDateString().split("/");
          const expiredDate = new Date(
            Number(reducedDate[2]),
            Number(reducedDate[0]) - 1,
            Number(reducedDate[1]),
          );
          if (checkDate < expiredDate) {
            db.run("DELETE FROM tasks WHERE id = ?", [Number(task[0])]);
            saveDatabaseToLocalStorage(db);
            return false;
          }
          return true;
        });
        setCompletedTasks(newResults);
      }
    } catch (error) {
      if (error) console.log(error);
    }
  }, [db]);

  return (
    <div className="relative h-screen min-w-80 flex-1 space-y-8 overflow-y-auto px-2 pb-4 pt-12 md:px-8">
      <div className="border-b border-black text-2xl font-bold">
        <h1>Completed</h1>
      </div>
      <div className="space-y-4">
        {completedTasks &&
          completedTasks.map((task) => {
            let categorySearch;
            const dateTime = String(task[7]).split(", ");

            if (db) {
              categorySearch = db.exec(
                "SELECT name FROM task_categories WHERE id = ?",
                [Number(task[5])],
              );
            }

            return (
              <div
                key={Number(task[0])}
                className="flex gap-x-2 border-b border-black"
              >
                <div className="pt-1">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    Font Awesome Free 6.7.2 by @fontawesome -
                    https://fontawesome.com License -
                    https://fontawesome.com/license/free Copyright 2025
                    Fonticons, Inc.
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                </div>
                <div className="w-full">
                  <h2>You completed: {String(task[1])}</h2>
                  <p className="text-neutral-500">
                    On {dateTime[0]} at {dateTime[1]}
                  </p>
                  <p className="text-right">
                    {categorySearch && String(categorySearch[0].values[0])}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
