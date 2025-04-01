import { useEffect } from "react";
import { useModal } from "../contexts/useModalContext";
import Modal from "./Modal";
import { useDatabase } from "../hooks/useDatabase";
import { useUpdate } from "../contexts/UpdateContext";
import saveDatabaseToLocalStorage from "../utils/saveDatabaseToLocalStorage";

interface Props {
  main: {
    search: boolean;
    today: boolean;
    upcoming: boolean;
    completed: boolean;
    overdue: boolean;
    category: string;
  };
  setMain: React.Dispatch<
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

export default function ConfirmModal({ main, setMain }: Props) {
  const [modal, setModal] = useModal();
  const { db } = useDatabase();
  const [trigger, setTrigger] = useUpdate();

  const handleDelete = () => {
    try {
      if (db && modal.confirmOptions) {
        const categoryOther = db.exec(
          `SELECT id FROM task_categories WHERE name = 'other'`,
        )[0].values[0][0];
        db.run(
          `
          UPDATE tasks
          SET category_id = ?
          WHERE category_id = (SELECT id FROM task_categories WHERE name = ?)
        `,
          [categoryOther, modal.confirmOptions.category],
        );
        db.run(
          `
          DELETE FROM task_categories
          WHERE id = (SELECT id FROM task_categories WHERE name = ?)
        `,
          [modal.confirmOptions.category],
        );
        saveDatabaseToLocalStorage(db);
        setTrigger(!trigger);
        setMain({ ...main, category: "other" });
        setModal({
          ...modal,
          confirmOptions: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={() => setModal({ ...modal, confirmOptions: undefined })}>
      <div className="flex flex-col gap-y-4 text-center">
        <h1 className="text-2xl font-bold">
          Are you sure you want to delete this category?!
        </h1>
        <p>
          Any tasks that have the deleted category will be moved into the
          category 'other'.
        </p>
        <div className="flex justify-between">
          <button
            className="rounded border border-black px-4 py-2"
            onClick={() => {
              setModal({
                ...modal,
                confirmOptions: undefined,
              });
            }}
          >
            Cancel
          </button>
          <button
            className="rounded bg-[#DC4C3E] px-4 py-2 text-white"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
