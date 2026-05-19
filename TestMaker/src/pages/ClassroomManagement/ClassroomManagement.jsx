import React, { useState } from "react";
import "./ClassroomManagement.css";
import Sidebar from "../../components/Sidebar/Sidebar";
function ClassroomManagement() {
  return (
    <div className="classroommanagement-container">
      <Sidebar />
      <main className="main-classroommanagement-content">
        <header className="classroommanagement-content-header">
          <h1>Zarządzanie klasami</h1>
        </header>
        <section className="classroommanagement-section"></section>
      </main>
    </div>
  );
}

export default ClassroomManagement;
