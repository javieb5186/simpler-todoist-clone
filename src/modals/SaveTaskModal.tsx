import Modal from "./Modal";
import { useModal } from "../contexts/useModalContext";
import { useEffect, useState } from "react";
import CategoryPopup from "../components/PopUps/CategoryPopup";
import CalendarPopup from "../components/PopUps/CalendarPopup";
import TimePopup from "../components/PopUps/TimePopup";
import { useDatabase } from "../hooks/useDatabase";
import saveDatabaseToLocalStorage from "../utils/saveDatabaseToLocalStorage";
import { useUpdate } from "../contexts/UpdateContext";
import { IndirectData } from "../App";

interface Props {
  taskId?: number;
  category?: string;
  date?: string[];
  setIndirectData: React.Dispatch<
    React.SetStateAction<IndirectData | undefined>
  >;
}

export default function SaveTaskModal({
  category,
  date,
  taskId,
  setIndirectData,
}: Props) {
  const { db, setFetch } = useDatabase();
  const [modal, setModal] = useModal();
  const [update, setUpdate] = useUpdate();
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [categoryPopUp, setCategoryPopUp] = useState(false);
  const [calendarPopUp, setCalendarPopUp] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    date || new Date().toLocaleDateString().split("/"),
  );
  const [selectedCategory, setSelectedCategory] = useState(category || "other");
  const [timePopup, setTimePopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  const handleSave = () => {
    try {
      if (db) {
        const month =
          selectedDate[0].length === 1
            ? selectedDate[0].padStart(2, "0")
            : selectedDate[0];
        const day =
          selectedDate[1].length === 1
            ? selectedDate[1].padStart(2, "0")
            : selectedDate[1];
        const dbDate = `${selectedDate[2]}-${month}-${day}`;

        let hour = Number(selectedTime[0]);

        if (selectedTime[2] === "AM") {
          if (hour === 12) hour = 12 - Number(selectedTime[0]);
        } else {
          if (hour !== 12) hour = 12 + Number(selectedTime[0]);
        }

        const hourStr = hour.toString().padStart(2, "0");

        const dbTime = `${hourStr}:${selectedTime[1]}`;

        let prep;
        if (!selectedTime) {
          if (taskId) {
            prep = db.prepare(
              "UPDATE tasks SET title = ?, description = ?, set_date = ?, category_id = ? WHERE id = ?",
            );
            prep.run([
              inputValue,
              textAreaValue,
              dbDate,
              selectedCategory,
              taskId,
            ]);
          } else {
            prep = db.prepare(
              "INSERT INTO tasks (title, description, set_date, category_id) VALUES(?, ?, ?, (SELECT id FROM task_categories WHERE name = ?));",
            );
            prep.run([inputValue, textAreaValue, dbDate, selectedCategory]);
          }
        } else {
          if (taskId) {
            prep = db.prepare(
              "UPDATE tasks SET title = ?, description = ?, set_date = ?, set_time = ?, category_id = (SELECT id FROM task_categories WHERE name = ?) WHERE id = ?",
            );
            prep.run([
              inputValue,
              textAreaValue,
              dbDate,
              dbTime,
              selectedCategory,
              taskId,
            ]);
          } else {
            prep = db.prepare(
              "INSERT INTO tasks (title, description, set_date, set_time, category_id) VALUES(?, ?, ?, ?, (SELECT id FROM task_categories WHERE name = ?));",
            );
            prep.run([
              inputValue,
              textAreaValue,
              dbDate,
              dbTime,
              selectedCategory,
            ]);
          }
        }
        saveDatabaseToLocalStorage(db);
        setModal({
          ...modal,
          addTask: false,
          addTaskOptions: { id: undefined },
        });
        setFetch();
        setUpdate(!update);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setDisabled(!inputValue.length || !textAreaValue.length);
  }, [inputValue, textAreaValue]);

  useEffect(() => {
    try {
      if (db && taskId) {
        const results = db.exec("SELECT * FROM tasks WHERE id = $id", {
          $id: taskId,
        });
        const data = results[0].values[0];
        setInputValue(String(data[1]));
        setTextAreaValue(String(data[2]));
        const date = String(data[3]).split("-");
        const newDate = new Date(
          Number(date[0]),
          Number(date[1]) - 1,
          Number(date[2]),
        );
        setSelectedDate(newDate.toLocaleDateString().split("/"));
        const categoryResults = db.exec(
          "SELECT name FROM task_categories WHERE id = $categoryId",
          { $categoryId: Number(data[5]) },
        );
        const category = categoryResults[0].values[0];
        setSelectedCategory(String(category[0]));

        if (String(data[4]).includes("undefined") !== true) {
          const time = String(data[4]);
          const newTime = time.split(/[ :]+/);
          const newDate = new Date(
            2025,
            1,
            1,
            Number(newTime[0]),
            Number(newTime[1]),
          );
          const localeTime = newDate.toLocaleTimeString();
          const newSplit = localeTime.split(/[ :]+/);
          const finalTime = [newSplit[0], newSplit[1], newSplit[3]];
          setSelectedTime(finalTime);
        }
      }
    } catch (error) {}
  }, [taskId]);

  return (
    <Modal onClose={() => setModal({ ...modal, addTask: false })}>
      <div
        className="flex flex-col"
        onClick={() => {
          setCalendarPopUp(false);
          setCategoryPopUp(false);
          setTimePopup(false);
        }}
      >
        <div className="flex h-24 flex-col items-start">
          <input
            type="text"
            placeholder="Add Title"
            className="w-full px-1 placeholder:text-xl"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.currentTarget.value);
            }}
          />
          <textarea
            className="w-full flex-1 px-1"
            value={textAreaValue}
            placeholder="Add Description"
            onChange={(e) => setTextAreaValue(e.currentTarget.value)}
          ></textarea>
        </div>
        <div className="relative flex w-fit gap-x-2 py-1">
          <button
            className="flex items-center gap-x-1 rounded border border-black p-1"
            onClick={(e) => {
              e.stopPropagation();
              setCalendarPopUp(!calendarPopUp);
              setCategoryPopUp(false);
            }}
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z" />
            </svg>
            <span>Date</span>
            <span>{selectedDate.join("-")}</span>
          </button>
          <button
            className="flex items-center gap-x-1 rounded border border-black p-1"
            onClick={(e) => {
              e.stopPropagation();
              setTimePopup(!timePopup);
            }}
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>
            <span>Time</span>
            {selectedTime.length > 0 && (
              <span>
                {selectedTime[0]}:{selectedTime[1]} {selectedTime[2]}
              </span>
            )}
          </button>
          {calendarPopUp && (
            <CalendarPopup
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
          {timePopup && (
            <TimePopup time={selectedTime} setTime={setSelectedTime} />
          )}
        </div>
        <div className="relative flex h-12 items-center justify-between border-t pt-2">
          <button
            className="flex items-center gap-x-1 p-1"
            onClick={(e) => {
              e.stopPropagation();
              setCategoryPopUp(!categoryPopUp);
              setCalendarPopUp(false);
            }}
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 160 0 0-256L64 160zm384 0l-160 0 0 256 160 0 0-256z" />
            </svg>
            <span>{selectedCategory}</span>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </button>
          <div className="space-x-2">
            <button
              className="rounded border border-black p-1"
              onClick={() => {
                setModal({
                  ...modal,
                  addTask: false,
                  addTaskOptions: { id: undefined },
                });
                setIndirectData(undefined);
              }}
            >
              Cancel
            </button>
            <button
              className={`rounded ${disabled ? "bg-neutral-200 text-black" : "bg-[#DC4C3E]"} p-1 text-white`}
              onClick={handleSave}
            >
              Save Task
            </button>
          </div>
          {categoryPopUp && <CategoryPopup setCategory={setSelectedCategory} />}
        </div>
      </div>
    </Modal>
  );
}
