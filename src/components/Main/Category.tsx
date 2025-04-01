import { useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { QueryExecResult } from "sql.js";
import TaskComponent from "./TaskComponent";
import { IndirectData } from "../../App";
import { useModal } from "../../contexts/useModalContext";
import { useUpdate } from "../../contexts/UpdateContext";

interface Props {
  category: string;
  setIndirectData: React.Dispatch<
    React.SetStateAction<IndirectData | undefined>
  >;
}

export default function Category({ category, setIndirectData }: Props) {
  const { db } = useDatabase();
  const [modal, setModal] = useModal();
  const [update, setUpdate] = useUpdate();
  const [categoryTasks, setCategoryTasks] = useState<QueryExecResult[]>([]);

  useEffect(() => {
    try {
      if (db) {
        const results = db.exec(
          "SELECT * FROM tasks WHERE category_id = (SELECT id FROM task_categories WHERE name = $category)  AND is_completed != 1;",
          { $category: category },
        );
        setCategoryTasks(results);
      }
    } catch (error) {}
  }, [db, category, update]);

  return (
    <div className="relative h-screen min-w-80 flex-1 overflow-y-auto px-2 pb-4 pt-12 md:px-8">
      <div className="mx-auto w-full space-y-2 md:max-w-screen-md">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold">{category}</h1>
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
                {categoryTasks.length > 0 && categoryTasks[0].values.length}{" "}
                tasks
              </span>
            </div>
          </div>
          {categoryTasks.length > 0 &&
            categoryTasks[0].values.map((task) => {
              return (
                <TaskComponent
                  key={String(task[1])}
                  taskId={Number(task[0])}
                  title={String(task[1])}
                  description={String(task[2])}
                  categoryId={Number(task[5])}
                  date={String(task[3])}
                  time={String(task[4])}
                  onComplete={() => setUpdate(!update)}
                />
              );
            })}
        </div>
        <button
          className="flex items-center gap-x-2 py-2 pr-4"
          onClick={() => {
            setIndirectData({ category: category });
            setModal({ ...modal, addTask: true });
          }}
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
