import React, { useState } from "react";
import "./StudentsResults.css";
import Sidebar from "../../components/Sidebar/Sidebar";
function StudentsResults() {
  return (
    <div className="studentsresults-container">
      <Sidebar />
      <main className="main-studentsresults-content">
        <header className="studentsresults-content-header">
          <h1>Wyniki uczniów</h1>
        </header>
        <section className="studentsresults-section"></section>
      </main>
    </div>
  );
}

export default StudentsResults;
