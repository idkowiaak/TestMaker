import React from "react";
import "./Sidebar.css";
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">TestMaker</div>
      <nav className="sidebar-nav">
        <a href="#" className="active">
          Moje Egzaminy
        </a>
        <a href="#">Wyniki Uczniów</a>
        <a href="#">Ustawienia</a>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn">Wyloguj się</button>
      </div>
    </aside>
  );
}
export default Sidebar;
