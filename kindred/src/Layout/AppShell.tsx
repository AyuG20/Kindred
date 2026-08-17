import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import './AppShell.css'

export function AppShell() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="kindered-app-frame ">
        <Outlet />
      </main>
    </div>
  );
}