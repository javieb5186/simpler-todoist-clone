import { useEffect, useState } from "react";
import TaskComponent from "./TaskComponent";
import { QueryExecResult } from "sql.js";
import { useDatabase } from "../../hooks/useDatabase";
import calendar from "calendar-js";
import CalendarPopup from "../PopUps/CalendarPopup";

interface Props {
  view: "list" | "board";
}

const currentDate = new Date();
const currentISODate = currentDate.toISOString().slice(0, 10);
const cal = calendar();
const todaysDate = new Date();
const localeDate = todaysDate.toLocaleDateString();
const extractedDate = localeDate.split("/");
const currentMonth = Number(extractedDate[0]);
const currentDay = Number(extractedDate[1]);
const currentYear = Number(extractedDate[2]);

export default function Upcoming({ view }: Props) {
  const { db } = useDatabase();
  const [upcomingTasks, setUpcomingTasks] = useState<QueryExecResult[]>([]);
  const [calendarPopUp, setCalendarPopUp] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString().split("/"),
  );

  useEffect(() => {
    try {
      if (db) {
        const results = db.exec("SELECT * FROM tasks WHERE set_date > $date", {
          $date: currentISODate,
        });
        setUpcomingTasks(results);
      }
    } catch (error) {
      if (error) console.log(error);
    }
  }, [db]);

  useEffect(() => {
    console.log(calendar);
  }, [calendar]);

  return (
    <div className="relative h-screen min-w-80 flex-1 overflow-y-auto px-2 pb-4 pt-12 md:px-8">
      <div className="absolute right-0 top-0 z-[5] px-2 py-2 md:px-0">
        <button
          className="relative flex items-center gap-x-2 py-1 pl-2 md:pr-8"
          onClick={(e) => {
            e.stopPropagation();
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
      </div>
      {view === "list" ? (
        <div className="mx-auto w-full space-y-2 md:max-w-screen-md">
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold">Upcoming</h1>
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
                  {upcomingTasks.length > 0 && upcomingTasks[0].values.length}{" "}
                  tasks
                </span>
              </div>
            </div>
            {upcomingTasks.length > 0 &&
              upcomingTasks[0].values.map((task) => {
                return (
                  <TaskComponent
                    key={String(task[1])}
                    title={String(task[1])}
                    description={String(task[2])}
                    id={Number(task[5])}
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
          <h1 className="text-2xl font-bold">Upcoming</h1>
          <div className="relative flex justify-between">
            <button
              className="flex items-center gap-x-1"
              onClick={(e) => {
                e.stopPropagation();
                setCalendarPopUp(!calendarPopUp);
              }}
            >
              <span>month</span>
              <span>year</span>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                Font Awesome Free 6.7.2 by @fontawesome -
                https://fontawesome.com License -
                https://fontawesome.com/license/free Copyright 2025 Fonticons,
                Inc.
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            </button>
            {calendarPopUp && (
              <CalendarPopup
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
          </div>
          <div className="space-y-4">
            {upcomingTasks.length > 0 &&
              upcomingTasks[0].values.map((task) => {
                return (
                  <TaskComponent
                    key={String(task[1])}
                    title={String(task[1])}
                    description={String(task[2])}
                    id={Number(task[5])}
                    view="board"
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
