import SideBar from "./components/SideBar/SideBar";
import Today from "./components/Main/Today";
import { DatabaseProvider } from "./contexts/DatabaseProvider";
import ModalProvider from "./contexts/ModalProvider";
import { useModal } from "./contexts/useModalContext";
import SaveTaskModal from "./modals/SaveTaskModal";
import SearchModal from "./modals/SearchModal";
import { useEffect, useState } from "react";
import Category from "./components/Main/Category";
import Upcoming from "./components/Main/Upcoming/Upcoming";
import Completed from "./components/Main/Completed";

const ModalChild = () => {
  const [modal] = useModal();
  const [main, setMain] = useState({
    today: true,
    upcoming: false,
    completed: false,
    overdue: false,
    category: "",
  });

  useEffect(() => {
    console.log(main);
  }, [main]);
  return (
    <>
      <div className="flex">
        <SideBar setState={setMain} />
        {main.today && <Today />}
        {main.category.length > 0 && (
          <Category category={main.category} view={"list"} />
        )}
        {main.upcoming && <Upcoming view={"board"} />}
        {main.completed && <Completed />}
      </div>
      {modal.addTask && <SaveTaskModal />}
      {modal.search && <SearchModal />}
    </>
  );
};

export default function App() {
  return (
    <DatabaseProvider>
      <ModalProvider>
        <ModalChild />
      </ModalProvider>
    </DatabaseProvider>
  );
}
