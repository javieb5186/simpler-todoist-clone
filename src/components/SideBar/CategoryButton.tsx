import { SqlValue } from "sql.js";
import { useDatabase } from "../../hooks/useDatabase";
import { useState, useEffect } from "react";

interface CategoryButtonProps {
  category: SqlValue;
  onClick: () => void;
}

const CategoryButton = ({ category, onClick }: CategoryButtonProps) => {
  const { db } = useDatabase();
  const [counter, setCounter] = useState(0);

  // Get amount of tasks based on category, set on task
  useEffect(() => {
    if (db) {
      const result = db.exec(
        "SELECT * FROM tasks WHERE category_id = (SELECT id FROM task_categories WHERE name = $category)",
        { $category: category },
      );

      if (result.length) {
        setCounter(result[0].values.length);
      }
    }
  }, [category, db]);

  return (
    <button
      key={String(category)}
      className="flex justify-between py-2"
      onClick={onClick}
    >
      <span>
        {String(category)[0].toUpperCase() + String(category).slice(1)}
      </span>
      <span>{counter}</span>
    </button>
  );
};

export default CategoryButton;
