
import { Outlet } from "react-router-dom";
import Navbar from '../Navbar'
export default function MainLayout({ menu }) {
    
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar menu={menu} />

      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
}