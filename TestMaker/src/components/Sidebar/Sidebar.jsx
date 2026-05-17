import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar({}) {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const handleLogout = () => {
    localStorage.clear();
    alert("Pomyślnie wylogowano");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">TestMaker</div>

      <nav className="sidebar-nav">
        {/* OPCJE DLA NAUCZYCIELA */}
        {role === "teacher" && (
          <>
            <a href="#" className="active">
              Moje Egzaminy
            </a>
            <a href="#">Wyniki Uczniów</a>
            <a href="#">Test</a>
            <a href="#">Test</a>
            <a href="#">Test</a>
          </>
        )}

        {/* OPCJE DLA UCZNIA */}
        {role === "student" && (
          <>
            <a href="#" className="active">
              Dostępne Egzaminy
            </a>
            <a href="#">Moje Wyniki</a>
            <a href="#">TEST</a>
            <a href="#">TEST</a>
            <a href="#">TEST</a>
          </>
        )}

        {/* WSPÓLNE OPCJE */}
        <a href="#">Ustawienia</a>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Wyloguj się
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
