import { useState, useEffect } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import TaskComponent from "./TaskComponent";
import { QueryExecResult } from "sql.js";
import { useUpdate } from "../../contexts/UpdateContext";

export default function Search() {
  const { db } = useDatabase();
  const [update, setUpdate] = useUpdate();
  const [input, setInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchedTasks, setSearchedTasks] = useState<QueryExecResult[]>([]);
  const [savedSearches, setSavedSearches] = useState<QueryExecResult[]>([]);
  const [triggerSearch, setTriggerSearch] = useState(false);

  useEffect(() => {
    if (input.length === 0) setSearchedTasks([]);
  }, [input]);

  useEffect(() => {
    if (db) {
      const results = db.exec("SELECT * FROM searches");
      setSavedSearches(results);
    }
  }, [db, triggerSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(input);
    }, 1000);

    return () => clearTimeout(handler);
  }, [input]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(input);
    }, 5000);

    return () => clearTimeout(handler);
  }, [input]);

  useEffect(() => {
    if (debouncedValue && db) {
      const results = db.exec(
        `SELECT * FROM tasks WHERE (title LIKE '%${debouncedValue}%' OR description LIKE '%${debouncedValue}%') AND is_completed != 1;`,
      );
      setSearchedTasks(results);
    }
  }, [db, debouncedValue, update]);

  useEffect(() => {
    if (debouncedSearch && db) {
      if (savedSearches.length > 0) {
        if (
          savedSearches[0].values.some(
            (val) => String(val[1]) === debouncedSearch,
          ) === false
        ) {
          db.run("INSERT INTO searches (search) VALUES (?);", [
            debouncedSearch,
          ]);
          setTriggerSearch(!triggerSearch);
        }
      } else {
        db.run("INSERT INTO searches (search) VALUES (?);", [debouncedSearch]);
        setTriggerSearch(!triggerSearch);
      }
    }
  }, [db, debouncedSearch]);

  return (
    <div className="relative h-screen min-w-80 flex-1 overflow-y-auto px-2 pb-4 pt-12 md:px-8">
      <div className="mx-auto w-full md:max-w-screen-md">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Search</h1>
            <div className="flex items-center gap-x-2 rounded border p-1">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                Font Awesome Free 6.7.2 by @fontawesome -
                https://fontawesome.com License -
                https://fontawesome.com/license/free Copyright 2025 Fonticons,
                Inc.
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              <input
                type="search"
                placeholder="Type keywords..."
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                className="w-full p-1"
              />
            </div>
            <div>
              <h2 className="text-xl">
                {input.length > 0
                  ? searchedTasks.length > 0
                    ? "Results"
                    : "No Results"
                  : "Recently Searched"}
              </h2>
            </div>
          </div>
          {input.length > 0 ? (
            <>
              {searchedTasks.length > 0 &&
                searchedTasks[0].values.map((task) => {
                  return (
                    <TaskComponent
                      key={String(task[0])}
                      taskId={Number(task[0])}
                      title={String(task[1])}
                      description={String(task[2])}
                      categoryId={Number(task[5])}
                      date={String(task[3])}
                      onComplete={() => setUpdate(!update)}
                    />
                  );
                })}
            </>
          ) : (
            <div className="flex flex-wrap gap-2">
              {savedSearches.length > 0 &&
                savedSearches[0].values.map((search, index) => {
                  return (
                    <button
                      key={index}
                      className="rounded border border-black px-4 py-2"
                      onClick={() => {
                        setInput(String(search[1]));
                        setDebouncedValue(String(search[1]));
                      }}
                    >
                      {search[1]}
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
