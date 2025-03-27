import { SqlValue } from "sql.js";
import { useDatabase } from "../../hooks/useDatabase";
import { useState, useEffect } from "react";
import { useUpdate } from "../../contexts/UpdateContext";

interface CategoryButtonProps {
  category: SqlValue;
  onClick: () => void;
}

const CategoryButton = ({ category, onClick }: CategoryButtonProps) => {
  const { db } = useDatabase();
  const [counter, setCounter] = useState(0);
  const [update] = useUpdate();

  // Get amount of tasks based on category, set on task
  useEffect(() => {
    if (db) {
      const result = db.exec(
        "SELECT * FROM tasks WHERE category_id = (SELECT id FROM task_categories WHERE name = $category) AND is_completed != 1;",
        { $category: category },
      );

      if (result[0]) {
        setCounter(result[0].values.length);
      } else {
        setCounter(0);
      }
    }
  }, [category, db, update]);

  return (
    <button
      key={String(category)}
      className="flex justify-between py-2"
      onClick={onClick}
    >
      <span>{String(category)}</span>
      <span>{counter}</span>
    </button>
  );
};

export default CategoryButton;
