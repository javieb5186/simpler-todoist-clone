import { useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { QueryExecResult } from "sql.js";
import TaskComponent from "./TaskComponent";
import { useModal } from "../../contexts/useModalContext";
import { useUpdate } from "../../contexts/UpdateContext";

// Seralize data to be used by sql
const todaysDate = new Date().toLocaleDateString();
const date = todaysDate.split("/");
const formattedDate = new Date(`${date[2]}-${date[0]}-${date[1]}`);
const isoDate = formattedDate.toISOString().slice(0, 10);

export default function Today() {
  const { db, fetch } = useDatabase();
  const [modal, setModal] = useModal();
  const [update, setUpdate] = useUpdate();
  const [todaysTasks, setTodaysTasks] = useState<QueryExecResult[]>([]);

  // Get all tasks that are for today and display it
  useEffect(() => {
    try {
      if (db) {
        const results = db.exec(
          "SELECT * FROM tasks WHERE set_date = $date AND is_completed != 1;",
          {
            $date: isoDate,
          },
        );
        setTodaysTasks(results);
      }
    } catch (error) {
      if (error) console.log(error);
    }
  }, [db, fetch, update]);

  useEffect(() => {
    console.log(todaysTasks);
  }, [todaysTasks]);

  return (
    <div className="relative h-screen min-w-80 flex-1 overflow-y-auto px-2 pb-4 pt-12 md:px-8">
      <div className="mx-auto w-full space-y-2 md:max-w-screen-md">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Today</h1>
            <div className="flex items-center gap-x-2">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                Font Awesome Free 6.7.2 by @fontawesome -
                https://fontawesome.com License -
                https://fontawesome.com/license/free Copyright 2025 Fonticons,
                Inc.
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
              </svg>
              <span>
                {todaysTasks.length > 0 && todaysTasks[0].values.length} tasks
              </span>
            </div>
          </div>
          {todaysTasks.length > 0 &&
            todaysTasks[0].values.map((task) => {
              return (
                <TaskComponent
                  key={String(task[1])}
                  taskId={Number(task[0])}
                  title={String(task[1])}
                  description={String(task[2])}
                  categoryId={Number(task[5])}
                  date={String(task[3])}
                  onComplete={() => setUpdate(!update)}
                />
              );
            })}
        </div>
        <button
          className="flex items-center gap-x-2 py-2 pr-4"
          onClick={() => setModal({ ...modal, addTask: true })}
        >
          <svg
            className="h-4 w-4 fill-[#DC4C3E]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license/free Copyright 2025
            Fonticons, Inc.
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}
