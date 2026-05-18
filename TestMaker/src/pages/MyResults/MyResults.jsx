import React, { useState } from "react";
import "./MyResults.css";
import Sidebar from "../../components/Sidebar/Sidebar";
function MyResults() {
  return (
    <div className="MyResults-container">
      <Sidebar />
      <main className="main-MyResults-content">
        <header className="MyResults-content-header">
          <h1>Moje wyniki</h1>
        </header>
        <section className="MyResults-section"></section>
      </main>
    </div>
  );
}

export default MyResults;
