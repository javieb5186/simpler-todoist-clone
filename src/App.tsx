import SideBar from "./components/SideBar/SideBar";
import Today from "./components/Main/Today";
import { DatabaseProvider } from "./contexts/DatabaseProvider";
import ModalProvider from "./contexts/ModalProvider";
import { useModal } from "./contexts/useModalContext";
import SaveTaskModal from "./modals/SaveTaskModal";
import SearchModal from "./modals/SearchModal";
import { useState } from "react";
import Category from "./components/Main/Category";
import Upcoming from "./components/Main/Upcoming/Upcoming";
import Completed from "./components/Main/Completed";
import Search from "./components/Main/Search";
import Overdue from "./components/Main/Overdue";
import UpdateProvider from "./contexts/UpdateProvider";
import ConfirmModal from "./modals/ConfirmModal";

export interface IndirectData {
  category?: string;
  date?: string[];
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

  return (
    <>
      <div className="flex">
        <SideBar setState={setMain} />
        {main.search && <Search />}
        {main.today && <Today />}
        {main.category.length > 0 && (
          <Category
            category={main.category}
            setIndirectData={setIndirectData}
          />
        )}
        {main.upcoming && <Upcoming setIndirectData={setIndirectData} />}
        {main.completed && <Completed />}
        {main.overdue && <Overdue />}
      </div>
      {modal.addTask && (
        <SaveTaskModal
          category={indirectData?.category}
          date={indirectData?.date}
          taskId={modal.addTaskOptions?.id}
          setIndirectData={setIndirectData}
        />
      )}
      {modal.confirmOptions && <ConfirmModal main={main} setMain={setMain} />}
    </>
  );
};

export default function App() {
  return (
    <DatabaseProvider>
      <UpdateProvider>
        <ModalProvider>
          <ModalChild />
        </ModalProvider>
      </UpdateProvider>
    </DatabaseProvider>
  );
}
