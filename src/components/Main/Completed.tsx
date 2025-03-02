import { useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { QueryExecResult } from "sql.js";

export default function Completed() {
  const { db } = useDatabase();
  const [completedTasks, setCompletedTasks] = useState<QueryExecResult[]>([]);

  useEffect(() => {
    try {
      if (db) {
        const results = db.exec("SELECT * FROM tasks WHERE is_completed = ?", [
          1,
        ]);
        setCompletedTasks(results);
      }
    } catch (error) {
      if (error) console.log(error);
    }
  }, [db]);

  useEffect(() => {
    console.log(completedTasks);
  }, [completedTasks]);

  return (
    <div className="relative h-screen min-w-80 flex-1 space-y-8 overflow-y-auto px-2 pb-4 pt-12 md:px-8">
      <div className="border-b border-black text-2xl font-bold">
        <h1>Completed</h1>
      </div>
      <div className="space-y-4">
        {completedTasks.length > 0 &&
          completedTasks[0].values.map((task) => {
            let categorySearch;

            if (db) {
              categorySearch = db.exec(
                "SELECT name FROM task_categories WHERE id = ?",
                [Number(task[5])],
              );
            }

            console.log("Category", categorySearch);

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
                  <p>On date at time</p>
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
