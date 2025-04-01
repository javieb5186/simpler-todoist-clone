import { SqlValue } from "sql.js";
import { useDatabase } from "../../hooks/useDatabase";
import { useState, useEffect } from "react";
import { useUpdate } from "../../contexts/UpdateContext";
import { useModal } from "../../contexts/useModalContext";

interface CategoryButtonProps {
  category: SqlValue;
  onClick: () => void;
}

const CategoryButton = ({ category, onClick }: CategoryButtonProps) => {
  const { db } = useDatabase();
  const [modal, setModal] = useModal();
  const [counter, setCounter] = useState(0);
  const [update] = useUpdate();
  const [hover, setHover] = useState(false);

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
    <div
      key={String(category)}
      className="flex justify-between py-2"
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <span>{String(category)}</span>
      {hover && String(category) !== "other" ? (
        <button
          onClick={() =>
            setModal({
              ...modal,
              confirmOptions: { category: String(category) },
            })
          }
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license/free Copyright 2025
            Fonticons, Inc
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      ) : (
        <span>{counter}</span>
      )}
    </div>
  );
};

export default CategoryButton;
