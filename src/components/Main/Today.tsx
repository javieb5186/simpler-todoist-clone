import { useEffect, useRef, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { QueryExecResult } from "sql.js";
import TaskComponent from "./TaskComponent";
import ViewPopup from "../PopUps/ViewPopup";
import useClickAway from "../../hooks/useClickAway";

// Seralize data to be used by sql
const todaysDate = new Date().toLocaleDateString();
const date = todaysDate.split("/");
const formattedDate = new Date(`${date[2]}-${date[0]}-${date[1]}`);
const isoDate = formattedDate.toISOString().slice(0, 10);

const uiDate = formattedDate.toDateString().split(" ");

export default function Today() {
  const { db, fetch } = useDatabase();
  const viewRef = useRef<HTMLDivElement>(null);
  const [todaysTasks, setTodaysTasks] = useState<QueryExecResult[]>([]);
  const [view, setView] = useState<"list" | "board">("board");
  const [openView, setOpenView] = useState(true);
  const [trigger, setTrigger] = useState(false);

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
  }, [db, fetch, trigger]);

  useClickAway(viewRef, () => {
    setOpenView(false);
  });

  useEffect(() => {
    console.log(todaysTasks);
  }, [todaysTasks]);

  return (
    <div className="relative h-screen min-w-80 flex-1 overflow-y-auto px-2 pb-4 pt-12 md:px-8">
      <div className="absolute right-0 top-0 z-[5] px-2 py-2 md:px-0">
        <button
          className="relative flex items-center gap-x-2 py-1 pl-2 md:pr-8"
          onClick={(e) => {
            e.stopPropagation();
            setOpenView(!openView);
          }}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license/free Copyright 2025
            Fonticons, Inc.
            <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
          </svg>
          <span>View</span>
        </button>
        {openView && (
          <ViewPopup
            ref={viewRef}
            list={() => setView("list")}
            board={() => setView("board")}
          />
        )}
      </div>
      {view === "list" ? (
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
                    view="list"
                  />
                );
              })}
          </div>
          <button className="flex items-center gap-x-2 py-2 pr-4">
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
      ) : (
        <div className="w-full space-y-2">
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
          <div className="space-y-4">
            <p className="font-bold">
              {uiDate[1]} {uiDate[2]} - Today{" "}
              <span className="font-normal text-neutral-500">
                {todaysTasks.length > 0 && todaysTasks[0].values.length}
              </span>
            </p>
            {todaysTasks.length > 0 &&
              todaysTasks[0].values.map((task) => {
                return (
                  <TaskComponent
                    key={String(task[1])}
                    taskId={Number(task[0])}
                    title={String(task[1])}
                    description={String(task[2])}
                    categoryId={Number(task[5])}
                    view="board"
                    onClickCallback={() => setTrigger(!trigger)}
                  />
                );
              })}
            <button className="flex items-center gap-x-2 py-2 pr-4">
              <svg
                className="h-4 w-4 fill-[#DC4C3E]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                Font Awesome Free 6.7.2 by @fontawesome -
                https://fontawesome.com License -
                https://fontawesome.com/license/free Copyright 2025 Fonticons,
                Inc.
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>
              <span>Add Task</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
