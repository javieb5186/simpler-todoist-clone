import { Dispatch, useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { SqlValue } from "sql.js";

interface Props {
  setCategory: Dispatch<React.SetStateAction<string>>;
}

export default function CategoryPopup({ setCategory }: Props) {
  const { db } = useDatabase();
  const [categories, setCategories] = useState<SqlValue[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (db) {
      const result = db.exec("SELECT * FROM task_categories");
      const categoryArr = result[0].values.map((val) => val[1]);
      setCategories(categoryArr);
    }
  }, [db]);

  return (
    <div className="absolute left-0 top-full z-30 space-y-2 rounded border border-black bg-white p-1">
      <input
        type="search"
        className="w-full border-b p-1"
        placeholder="search category"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="space-y-2 *:w-full *:text-left">
        {categories?.map((category) => {
          console.log(category);
          return (
            <button
              key={String(category)}
              onClick={() => setCategory(String(category))}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
