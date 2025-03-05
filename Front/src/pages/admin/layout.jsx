import { Outlet } from "react-router-dom";
import { SideBar } from "../../ui/layout/SideNav";
import { NavBar } from "../../ui/layout/navBar";

export default function LayoutAdmin() {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-24">
        <SideBar />
      </div>
      <div className="flex-grow md:overflow-y-auto sm:px-5 sm:py-2">
        <NavBar />
        <div className="flex-grow p-6 md:overflow-y-auto md:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
