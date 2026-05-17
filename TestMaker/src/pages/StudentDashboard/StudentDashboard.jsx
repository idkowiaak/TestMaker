import React, { useState } from "react";
import "./StudentDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
function StudentDashboard({ role }) {
  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <main className="main-content">
        <header className="content-header">
          <h1>Panel Ucznia</h1>
        </header>
        <section className="exams-section">
          <h2>Twoje przyszłe egzaminy</h2>
          <div className="exams-grid">
            <div className="exam-card placeholder-card">
              <h3>Brak testów</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;
