import { QueryExecResult } from "sql.js";
import { SelectedWeek } from "./interface";
import { Fragment } from "react/jsx-runtime";
import TaskComponent from "../TaskComponent";
import { useEffect } from "react";

interface RenderTasks {
  tasks: QueryExecResult[];
  selectedWeek: SelectedWeek;
  view: "board" | "list";
}

export default function RenderTasksToDays({
  tasks,
  selectedWeek,
  view,
}: RenderTasks) {
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    console.log(selectedWeek);
  }, [selectedWeek]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-x-2 divide-x divide-neutral-400 border border-black">
        {week.map((day, index) => {
          return (
            <div key={day} className="space-y-4">
              <div className="space-x-2 text-center">
                <span>{day}</span>
                <span>{selectedWeek.weekDays[index]}</span>
              </div>
            </div>
          );
        })}
      </div>
      {view === "board" ? (
        <div className="grid grid-cols-7 gap-2 *:justify-center">
          {week.map((day, index) => {
            return (
              <div key={day} className="space-y-4">
                {tasks.map((task) => {
                  const thisDayTask = task.values.filter((taskData) => {
                    return (
                      Number(String(taskData[3]).split("-")[2]) ===
                      selectedWeek.weekDays[index]
                    );
                  });

                  if (thisDayTask) {
                    return (
                      <Fragment key={String(thisDayTask[0])}>
                        {thisDayTask.map((task) => {
                          return (
                            <TaskComponent
                              key={String(task[0])}
                              taskId={Number(task[0])}
                              title={String(task[1])}
                              description={String(task[2])}
                              categoryId={Number(task[5])}
                              view={view}
                            />
                          );
                        })}
                      </Fragment>
                    );
                  }
                })}
                <button className="flex items-center gap-x-2 py-2 pr-4">
                  <svg
                    className="h-4 w-4 fill-[#DC4C3E]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    Font Awesome Free 6.7.2 by @fontawesome -
                    https://fontawesome.com License -
                    https://fontawesome.com/license/free Copyright 2025
                    Fonticons, Inc.
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  </svg>
                  <span>Add Task</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-8">
          {week.map((day, index) => {
            return (
              <div key={day} className="space-y-4 pb-2">
                <div className="flex gap-x-2 border-b pb-2">
                  <span>{day}</span>
                  <span>{selectedWeek.weekDays[index]}</span>
                </div>
                {tasks.map((task) => {
                  const thisDayTask = task.values.filter((taskData) => {
                    return (
                      Number(String(taskData[3]).split("-")[2]) ===
                      selectedWeek.weekDays[index]
                    );
                  });

                  if (thisDayTask) {
                    return (
                      <Fragment key={String(thisDayTask[0])}>
                        {thisDayTask.map((task) => {
                          return (
                            <TaskComponent
                              key={String(task[0])}
                              taskId={Number(task[0])}
                              title={String(task[1])}
                              description={String(task[2])}
                              categoryId={Number(task[5])}
                              view={view}
                            />
                          );
                        })}
                      </Fragment>
                    );
                  }
                })}
                <button className="flex items-center gap-x-2 py-2 pr-4">
                  <svg
                    className="h-4 w-4 fill-[#DC4C3E]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    Font Awesome Free 6.7.2 by @fontawesome -
                    https://fontawesome.com License -
                    https://fontawesome.com/license/free Copyright 2025
                    Fonticons, Inc.
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  </svg>
                  <span>Add Task</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
