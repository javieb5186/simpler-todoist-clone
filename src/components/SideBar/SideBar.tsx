import { Dispatch, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { SqlValue } from "sql.js";
import saveDatabaseToLocalStorage from "../../utils/saveDatabaseToLocalStorage";
import useWindowWidth from "../../hooks/useWindowWidth";
import CategoryButton from "./CategoryButton";
import { useModal } from "../../contexts/useModalContext";

const reset = {
  search: false,
  today: false,
  upcoming: false,
  completed: false,
  overdue: false,
  category: "",
};

interface Props {
  setState: Dispatch<
    React.SetStateAction<{
      search: boolean;
      today: boolean;
      upcoming: boolean;
      completed: boolean;
      overdue: boolean;
      category: string;
    }>
  >;
}

export default function SideBar({ setState }: Props) {
  const { db } = useDatabase();
  const [modal, setModal] = useModal();
  const width = useWindowWidth();
  const categoryRef = useRef<HTMLInputElement | null>(null);
  const [active, setActive] = useState(true);
  const [inputActive, setInputActive] = useState(false);
  const [categories, setCategories] = useState<SqlValue[] | undefined>(
    undefined,
  );
  const [trigger, setTrigger] = useState(false);

  // Update database and ui when user pressed enter on Add Category button.
  const handleCategory = (e: KeyboardEvent<HTMLInputElement>) => {
    if (categoryRef.current && e.key === "Enter") {
      categoryRef.current.blur();
      try {
        if (db && categoryRef.current.value.length > 0) {
          const prep = db.prepare(
            "INSERT INTO task_categories (name) VALUES (?);",
          );
          prep.run([categoryRef.current.value]);
          saveDatabaseToLocalStorage(db);
          setTrigger(!trigger);
        }
      } catch (error) {
        console.log(error);
      }
      categoryRef.current.value = "";
    }
  };

  // Get all categories
  useEffect(() => {
    if (db) {
      const result = db.exec("SELECT * FROM task_categories");
      const categoryArr = result[0].values.map((val) => val[1]);
      setCategories(categoryArr);
    }
  }, [db, trigger]);

  // Track width
  useEffect(() => {
    setActive(width > 767 ? true : false);
  }, [width]);

  return (
    <>
      <div className="fixed z-20 w-full max-w-[320px] p-3">
        <button
          aria-label="Toggle Side Bar"
          className={`absolute transition-[right] ${active ? "right-2" : "right-[90%]"}`}
          onClick={() => setActive(!active)}
        >
          {active ? (
            <svg
              aria-hidden
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M48 416c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80c-8.8 0-16 7.2-16 16l0 320zm16 64c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480zm64-224c0-6.7 2.8-13 7.7-17.6l112-104c7-6.5 17.2-8.2 25.9-4.4s14.4 12.5 14.4 22l0 208c0 9.5-5.7 18.2-14.4 22s-18.9 2.1-25.9-4.4l-112-104c-4.9-4.5-7.7-10.9-7.7-17.6z" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z" />
            </svg>
          )}
        </button>
      </div>
      <div
        className={`fixed left-0 top-0 z-10 h-screen max-w-[320px] space-y-12 overflow-y-auto bg-[#FFEFE5] p-3 transition-all md:relative ${active ? "w-full translate-x-0" : "w-[0%] -translate-x-full"}`}
      >
        <div className="flex flex-col gap-y-2 *:py-2">
          <div className="h-10" />
          <div className="relative">
            <button
              className="flex items-center gap-x-2"
              onClick={() => setModal({ ...modal, addTask: true })}
            >
              <svg
                className="h-6 w-6 fill-[#DC4C3E]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                Font Awesome Free 6.7.2 by @fontawesome -
                https://fontawesome.com License -
                https://fontawesome.com/license/free Copyright 2025 Fonticons,
                Inc.
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
              <span>Add Task</span>
            </button>
          </div>
          <button
            className="flex items-center gap-x-2"
            onClick={() => setState({ ...reset, search: true })}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <span>Search</span>
          </button>
          <button
            className="flex items-center gap-x-2"
            onClick={() => setState({ ...reset, today: true })}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
            </svg>
            <span>Today</span>
          </button>
          <button
            className="flex items-center gap-x-2"
            onClick={() => setState({ ...reset, upcoming: true })}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z" />
            </svg>
            <span>Upcoming</span>
          </button>
          <button
            className="flex items-center gap-x-2"
            onClick={() => setState({ ...reset, completed: true })}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
            <span>Completed</span>
          </button>
          <button
            className="flex items-center gap-x-2"
            onClick={() => setState({ ...reset, overdue: true })}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2025
              Fonticons, Inc.
              <path d="M128 0c13.3 0 24 10.7 24 24l0 40 144 0 0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40 40 0c35.3 0 64 28.7 64 64l0 16 0 48 0 256c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 192l0-48 0-16C0 92.7 28.7 64 64 64l40 0 0-40c0-13.3 10.7-24 24-24zM400 192L48 192l0 256c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-256zm-95 89l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
            <span>Overdue</span>
          </button>
        </div>
        <div className="flex flex-col gap-y-2 *:text-left">
          <h2 className="pb-2 text-xl font-medium">My Categories</h2>
          {categories?.map((category, index) => {
            return (
              <CategoryButton
                key={index}
                category={category}
                onClick={() =>
                  setState({ ...reset, category: String(category) })
                }
              />
            );
          })}
          <div className="flex items-center gap-x-1">
            <label htmlFor="add-category">
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
            </label>
            <input
              ref={categoryRef}
              id="add-category"
              name="add-category"
              type="text"
              placeholder="Add Category"
              className="min-w-0 flex-shrink overflow-hidden bg-transparent px-1 py-2 placeholder:text-black"
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
              onKeyDown={(e) => handleCategory(e)}
            />
            {inputActive && (
              <span className="flex-shrink-0 whitespace-nowrap text-neutral-600">
                Enter to Submit
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
