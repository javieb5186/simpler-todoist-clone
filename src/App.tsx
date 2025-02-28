import SideBar from "./components/SideBar/SideBar";
import TodayMain from "./components/Main/TodayMain";
import { DatabaseProvider } from "./contexts/DatabaseProvider";
import ModalProvider from "./contexts/ModalProvider";
import { useModal } from "./contexts/useModalContext";
import SaveTaskModal from "./modals/SaveTaskModal";
import SearchModal from "./modals/SearchModal";
import { useEffect, useState } from "react";
import Category from "./components/Main/Category";
import Upcoming from "./components/Main/Upcoming";

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
        {main.today && <TodayMain />}
        {main.category.length > 0 && (
          <Category category={main.category} view={"list"} />
        )}
        {main.upcoming && <Upcoming view={"board"} />}
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
