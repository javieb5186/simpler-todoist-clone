import { SqlValue } from "sql.js";
import { useDatabase } from "../../hooks/useDatabase";
import { useEffect, useState } from "react";
import TaskComponent from "./TaskComponent";
import { useUpdate } from "../../contexts/UpdateContext";

export default function Overdue() {
  const { db } = useDatabase();
  const [update, setUpdate] = useUpdate();
  const [overdueTasks, setOverdueTasks] = useState<SqlValue[][]>();

  useEffect(() => {
    try {
      if (db) {
        const results = db.exec("SELECT * FROM tasks WHERE is_completed != 1;");

        const date = new Date();
        const localeDate = date.toLocaleDateString();
        const currentDate = new Date(localeDate);

        const filteredResults = results[0].values.filter((task) => {
          const taskDate = String(task[3]).split("-");
          const newDate = new Date(
            Number(taskDate[0]),
            Number(taskDate[1]) - 1,
            Number(taskDate[2]),
          );

          return newDate < currentDate;
        });

        setOverdueTasks(filteredResults);
      }
    } catch (error) {
      console.log(error);
    }
  }, [db, update]);

  return (
    <div className="relative h-screen min-w-80 flex-1 space-y-8 overflow-y-auto px-2 pb-4 pt-12 md:px-8">
      <div className="border-b border-black text-2xl font-bold">
        <h1>Overdue</h1>
      </div>
      <div className="space-y-4">
        {overdueTasks &&
          overdueTasks.map((task) => {
            return (
              <div key={String(task[0])}>
                <TaskComponent
                  taskId={Number(task[0])}
                  title={String(task[1])}
                  description={String(task[2])}
                  categoryId={Number(task[5])}
                  date={String(task[3])}
                  onComplete={() => setUpdate(!update)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
