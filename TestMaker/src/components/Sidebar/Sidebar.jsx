import React from "react";
import "./Sidebar.css";
import { useNavigate, Link } from "react-router-dom";

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
            <Link to={"/teacher"}>Moje egzaminy</Link>
            <a href="#">Wyniki Uczniów</a>
            <a href="#">Zarządzanie klasami</a>
          </>
        )}

        {/* OPCJE DLA UCZNIA */}
        {role === "student" && (
          <>
            <Link to={"/student"}>Dostępne egzaminy</Link>
            <Link to={"/myresults"}>Moje wyniki</Link>
            <a href="#">TEST</a>
          </>
        )}

        {/* WSPÓLNE OPCJE */}
        <Link to={"/settings"}>Ustawienia</Link>
        <Link to={"/help"}>Pomoc</Link>
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
