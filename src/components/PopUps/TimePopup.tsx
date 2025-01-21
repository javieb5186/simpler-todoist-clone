import { Dispatch, useState } from "react";

type AmPm = "AM" | "PM";

interface Props {
  time: string[];
  setTime: Dispatch<React.SetStateAction<string[]>>;
}

export default function TimePopup({ time, setTime }: Props) {
  const date = new Date();
  const locale = date.toLocaleTimeString();
  const extractedTime = locale.split(/[ :]+/);

  const [hour, setHour] = useState((time && time[0]) || extractedTime[0]);
  const [minute, setMinute] = useState((time && time[1]) || extractedTime[1]);
  const [amPm, setAmPm] = useState<"AM" | "PM">(
    (time && (time[2] as AmPm)) || (extractedTime[3] as AmPm),
  );

  const handleIncreaseHour = () => {
    setHour((prevHour) => {
      if (Number(prevHour) === 12) {
        return String(1);
      } else {
        return String(Number(prevHour) + 1);
      }
    });
  };

  const handleDecreaseHour = () => {
    setHour((prevHour) => {
      if (Number(prevHour) === 1) {
        return String(12);
      } else {
        return String(Number(prevHour) - 1);
      }
    });
  };

  const handleIncreaseMinute = () => {
    setMinute((prevMinute) => {
      if (Number(prevMinute) === 59) {
        return String(0).padStart(2, "0");
      } else {
        const nextMinute = String(Number(prevMinute) + 1);

        if (nextMinute.length === 1) return nextMinute.padStart(2, "0");
        else return nextMinute;
      }
    });
  };

  const handleDecreaseMinute = () => {
    setMinute((prevMinute) => {
      if (Number(prevMinute) === 0) {
        return String(59);
      } else {
        const nextMinute = String(Number(prevMinute) - 1);

        if (nextMinute.length === 1) return nextMinute.padStart(2, "0");
        else return nextMinute;
      }
    });
  };

  const handleSaveTime = () => {
    setTime([hour, minute, amPm]);
  };

  return (
    <div className="absolute right-0 top-full z-30 space-y-2 rounded border border-black bg-white p-1">
      <div
        className="flex w-40 items-center justify-center gap-x-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <button onClick={handleIncreaseHour}>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
            </svg>
          </button>
          <span>{hour}</span>
          <button onClick={handleDecreaseHour}>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button onClick={handleIncreaseMinute}>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
            </svg>
          </button>
          <span>{minute}</span>
          <button onClick={handleDecreaseMinute}>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
          </button>
        </div>
        <div className="space-x-2">
          <button
            className={`rounded p-1 ${amPm === "AM" ? "bg-[#DC4C3E] text-white" : "hover:bg-neutral-300"}`}
            onClick={() => setAmPm("AM")}
          >
            AM
          </button>
          <button
            className={`rounded p-1 ${amPm === "PM" ? "bg-[#DC4C3E] text-white" : "hover:bg-neutral-300"}`}
            onClick={() => setAmPm("PM")}
          >
            PM
          </button>
        </div>
      </div>
      <button
        className="w-full rounded bg-[#DC4C3E] py-1 text-white"
        onClick={handleSaveTime}
      >
        Set Time
      </button>
    </div>
  );
}
