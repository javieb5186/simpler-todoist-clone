import SideBar from "./components/SideBar/SideBar";
import TodayMain from "./components/Main/TodayMain";
import { DatabaseProvider } from "./contexts/DatabaseProvider";
import ModalProvider from "./contexts/ModalProvider";
import { useModal } from "./contexts/useModalContext";
import SaveTaskModal from "./modals/SaveTaskModal";
import SearchModal from "./modals/SearchModal";

const ModalChild = () => {
  const [modal] = useModal();
  return (
    <>
      <div className="flex">
        <SideBar />
        <TodayMain />
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
