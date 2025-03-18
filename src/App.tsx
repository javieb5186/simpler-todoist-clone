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
import Search from "./components/Main/Search";
import Overdue from "./components/Main/Overdue";

export interface IndirectData {
  category?: string;
}

const ModalChild = () => {
  const [modal] = useModal();
  const [main, setMain] = useState({
    search: false,
    today: true,
    upcoming: false,
    completed: false,
    overdue: false,
    category: "",
  });
  const [indirectData, setIndirectData] = useState<IndirectData | undefined>();

  useEffect(() => {
    console.log(main);
  }, [main]);
  return (
    <>
      <div className="flex">
        <SideBar setState={setMain} />
        {main.search && <Search />}
        {main.today && <Today />}
        {main.category.length > 0 && (
          <Category
            category={main.category}
            view={"list"}
            setIndirectData={setIndirectData}
          />
        )}
        {main.upcoming && <Upcoming view={"board"} />}
        {main.completed && <Completed />}
        {main.overdue && <Overdue />}
      </div>
      {modal.addTask && <SaveTaskModal category={indirectData?.category} />}
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
