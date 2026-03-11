
import { Outlet } from "react-router-dom";
import Navbar from '../Navbar-2'
export default function MainLayout({ menu }) {
    
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar menu={menu} />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

    </div>
  );
}