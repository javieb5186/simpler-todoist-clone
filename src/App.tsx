import SideBar from "./components/SideBar/SideBar";
import TodayMain from "./components/Main/TodayMain";
import { DatabaseProvider } from "./contexts/DatabaseProvider";

export default function App() {
  return (
    <DatabaseProvider>
      <div className="flex">
        <SideBar />
        <TodayMain />
      </div>
    </DatabaseProvider>
  );
}
