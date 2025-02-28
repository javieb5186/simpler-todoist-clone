import calendar from "calendar-js";
import { Dispatch, useEffect, useState } from "react";

const cal = calendar();
const todaysDate = new Date();
const localeDate = todaysDate.toLocaleDateString();
const extractedDate = localeDate.split("/");
const currentMonth = Number(extractedDate[0]);
const currentDay = Number(extractedDate[1]);
const currentYear = Number(extractedDate[2]);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Props {
  selectedDate: string[];
  setSelectedDate: Dispatch<React.SetStateAction<string[]>>;
  callBack?: () => void;
}

export default function CalendarPopup({
  selectedDate,
  setSelectedDate,
  callBack,
}: Props) {
  const [calendar, setCalendar] = useState(
    cal.of(currentYear, currentMonth - 1),
  );

  useEffect(() => {
    if (selectedDate.length > 0) {
      setCalendar(cal.of(Number(selectedDate[2]), Number(selectedDate[0]) - 1));
    }
  }, []);

  const handleNextMonth = () => {
    setCalendar((prevCalendar) => {
      const month = months.indexOf(prevCalendar.monthAbbr);
      const year = Number(prevCalendar.year);

      if (month + 1 > 11) {
        return cal.of(year + 1, 0);
      } else {
        return cal.of(year, month + 1);
      }
    });
  };

  const handlePreviousMonth = () => {
    setCalendar((prevCalendar) => {
      const month = months.indexOf(prevCalendar.monthAbbr);
      const year = Number(prevCalendar.year);
      const calDate = new Date(year, month, 1);

      if (calDate < todaysDate) return prevCalendar;

      if (month - 1 < 0) {
        return cal.of(year - 1, 11);
      } else {
        return cal.of(year, month - 1);
      }
    });
  };

  const handleCurrentMonth = () => {
    setCalendar(cal.of(currentYear, currentMonth - 1));
  };

  const handleSelectDate = (month: number, day: number, year: number) => {
    const monthStr = String(month + 1);
    const dayStr = String(day);
    const yearStr = String(year);
    setSelectedDate([monthStr, dayStr, yearStr]);
    if (callBack) callBack();
  };

  return (
    <div className="absolute left-0 top-full z-30 w-64 space-y-2 border border-black bg-white p-2">
      <div
        className="flex justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <span>
          {calendar.monthAbbr} {calendar.year}
        </span>
        <div className="flex gap-x-2">
          <button className="p-1" onClick={handlePreviousMonth}>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>
          <button className="p-1" onClick={handleCurrentMonth}>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
            </svg>
          </button>
          <button className="p-1" onClick={handleNextMonth}>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid h-full grid-cols-7 gap-x-1 gap-y-2">
        {calendar.calendar.map((week, weekIndex) => {
          return week.map((day, dayIndex) => {
            const month = months.indexOf(calendar.monthAbbr);
            const year = Number(calendar.year);

            const selectedMonth = Number(selectedDate[0]) - 1;
            const selectedDay = Number(selectedDate[1]);
            const selectedYear = Number(selectedDate[2]);

            if (
              year === selectedYear &&
              month === selectedMonth &&
              day === selectedDay
            ) {
              return (
                <button
                  key={`${weekIndex}${dayIndex}`}
                  className="h-8 w-8 rounded-full bg-[#DC4C3E] text-white"
                >
                  {day === 0 ? "" : day}
                </button>
              );
            } else if (
              year === currentYear &&
              month === currentMonth - 1 &&
              day < currentDay
            ) {
              return day === 0 ? (
                <button
                  key={`${weekIndex}${dayIndex}`}
                  className="h-8 w-8 bg-white"
                  disabled
                ></button>
              ) : (
                <button
                  key={`${weekIndex}${dayIndex}`}
                  className="h-8 w-8 rounded-full text-neutral-400"
                  disabled
                >
                  {day === 0 ? "" : day}
                </button>
              );
            } else {
              return (
                <button
                  key={`${weekIndex}${dayIndex}`}
                  className="h-8 w-8 rounded-full hover:bg-neutral-300"
                  onClick={() => {
                    handleSelectDate(month, day, year);
                  }}
                >
                  {day === 0 ? "" : day}
                </button>
              );
            }
          });
        })}
      </div>
    </div>
  );
}
