import { useEffect, useState } from "react";
import { QueryExecResult } from "sql.js";
import { useDatabase } from "../../../hooks/useDatabase";
import calendar from "calendar-js";
import CalendarPopup from "../../PopUps/CalendarPopup";
import RenderTasksToDays from "./RenderTasksToDays";
import { SelectedWeek } from "./interface";
import { IndirectData } from "../../../App";
import { useModal } from "../../../contexts/useModalContext";
import { useUpdate } from "../../../contexts/UpdateContext";

interface Props {
  setIndirectData: React.Dispatch<
    React.SetStateAction<IndirectData | undefined>
  >;
}

const cal = calendar();

export default function Upcoming({ setIndirectData }: Props) {
  const { db } = useDatabase();
  const [modal] = useModal();
  const [update, setUpdate] = useUpdate();
  const [upcomingTasks, setUpcomingTasks] = useState<QueryExecResult[]>([]);
  const [calendarPopUp, setCalendarPopUp] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString().split("/"),
  );
  const [selectedWeek, setSelectedWeek] = useState<SelectedWeek>();

  // Initial instance of cal creates the selected week.
  // Which defaults to today
  useEffect(() => {
    try {
      const selectedYear = Number(selectedDate[2]);
      const selectedMonth = Number(selectedDate[0]);
      const selectedDay = Number(selectedDate[1]);
      const data = cal.of(selectedYear, selectedMonth - 1);
      const week = data.calendar
        .filter((week) => week.includes(selectedDay))
        .flat();

      // Check if a previous or next month is in calendarjs
      const hasZeros = week.some((value) => value === 0);
      let prev = false;
      let next = false;
      let length = 0;
      let newWeek = week;

      if (hasZeros) {
        const filteredWeek = week.filter((day) => day !== 0);
        length = week.filter((day) => day === 0).length;

        // Check if the 0 are at the beginning or end of the selected week
        // Also check if its the next year or last year
        if (week[0] === 0) {
          prev = true;
          let newMonth = selectedMonth - 2;
          let newYear = selectedYear;
          if (newMonth < 0) {
            newMonth = 11;
            newYear--;
          }
          const prevCal = cal.of(newYear, newMonth);
          const prevWeek = prevCal.calendar[prevCal.calendar.length - 1];
          const filteredPrevWeek = prevWeek.filter((day) => day !== 0);
          newWeek = [filteredPrevWeek, filteredWeek].flat();
        } else if (week[week.length - 1] === 0) {
          next = true;
          let newMonth = selectedMonth;
          let newYear = selectedYear;
          if (newMonth > 11) {
            newMonth = 0;
            newYear++;
          }
          const nextCal = cal.of(newYear, newMonth);
          const nextWeek = nextCal.calendar[0];
          const filteredNextWeek = nextWeek.filter((day) => day !== 0);
          newWeek = [filteredWeek, filteredNextWeek].flat();
        }
      }

      setSelectedWeek({
        weekDays: newWeek,
        month: selectedMonth - 1,
        year: selectedYear,
        prevMonth: prev,
        nextMonth: next,
        otherDays: length,
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedDate]);

  // Get all tasks from between the start and end date
  useEffect(() => {
    if (selectedWeek) {
      const filteredWeek = selectedWeek.weekDays.filter((days) => days !== 0);
      const startDay = String(filteredWeek[0]);
      const lastDay = String(filteredWeek[filteredWeek.length - 1]);
      const startISODate = new Date(
        `${selectedWeek.year}-${String(selectedWeek.month + 1).padStart(2, "0")}-${startDay.padStart(2, "0")}`,
      )
        .toISOString()
        .slice(0, 10);
      const endISODate = new Date(
        `${selectedWeek.year}-${String(selectedWeek.month + 1).padStart(2, "0")}-${lastDay.padStart(2, "0")}`,
      )
        .toISOString()
        .slice(0, 10);

      let results;

      if (db) {
        if (selectedWeek.nextMonth) {
          let newYear = selectedWeek.year;
          let newMonth = selectedWeek.month;
          if (selectedWeek.month + 2 > 12) {
            newMonth = 1;
            newYear = selectedWeek.year + 1;
          }
          const endISODate = new Date(
            `${newYear}-${String(newMonth).padStart(2, "0")}-${selectedWeek.otherDays}`,
          )
            .toISOString()
            .slice(0, 10);

          results = db.exec(
            "SELECT * FROM tasks WHERE set_date BETWEEN $startDate AND $endDate AND is_completed != 1;",
            {
              $startDate: startISODate,
              $endDate: endISODate,
            },
          );
        } else if (selectedWeek.prevMonth) {
          let newYear = selectedWeek.year;
          let newMonth = selectedWeek.month;
          if (selectedWeek.month < 1) {
            newMonth = 12;
            newYear = selectedWeek.year - 1;
          }

          const tempCal = cal.of(newYear, newMonth - 1);
          const newDay = Math.max(
            ...tempCal.calendar[tempCal.calendar.length - 1],
          );
          const startISODate = new Date(
            `${newYear}-${String(newMonth).padStart(2, "0")}-${newDay - selectedWeek.otherDays + 1}`,
          )
            .toISOString()
            .slice(0, 10);

          results = db.exec(
            "SELECT * FROM tasks WHERE set_date BETWEEN $startDate AND $endDate AND is_completed != 1;",
            {
              $startDate: startISODate,
              $endDate: endISODate,
            },
          );
        } else {
          results = db.exec(
            "SELECT * FROM tasks WHERE set_date BETWEEN $startDate AND $endDate AND is_completed != 1;",
            {
              $startDate: startISODate,
              $endDate: endISODate,
            },
          );
        }
        setUpcomingTasks(results);
      }
    }
  }, [db, selectedWeek, update, modal.addTask]);

  return (
    <div className="relative h-screen min-w-80 flex-1 overflow-y-auto px-2 pb-4 pt-12 md:px-8">
      <div className="mx-auto w-full space-y-2 md:max-w-screen-md">
        <h1 className="text-2xl font-bold">Upcoming</h1>
        <div className="relative flex justify-between">
          <button
            className="flex items-center gap-x-1"
            onClick={(e) => {
              e.stopPropagation();
              setCalendarPopUp(!calendarPopUp);
            }}
          >
            <span>
              {
                cal.of(Number(selectedDate[2]), Number(selectedDate[0]) - 1)
                  .month
              }
            </span>
            <span>
              {
                cal.of(Number(selectedDate[2]), Number(selectedDate[0]) - 1)
                  .year
              }
            </span>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </button>
          {calendarPopUp && (
            <CalendarPopup
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              callBack={() => {
                setCalendarPopUp(false);
              }}
            />
          )}
        </div>
        {selectedWeek && (
          <RenderTasksToDays
            tasks={upcomingTasks}
            selectedWeek={selectedWeek}
            setIndirectData={setIndirectData}
            callback={() => setUpdate(!update)}
          />
        )}
      </div>
    </div>
  );
}
