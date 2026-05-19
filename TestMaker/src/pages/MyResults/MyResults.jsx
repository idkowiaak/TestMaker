import React, { useState } from "react";
import "./MyResults.css";
import Sidebar from "../../components/Sidebar/Sidebar";
function MyResults() {
  return (
    <div className="myresults-container">
      <Sidebar />
      <main className="main-myresults-content">
        <header className="myresults-content-header">
          <h1>Moje wyniki</h1>
        </header>
        <section className="myresults-section"></section>
      </main>
    </div>
  );
}

export default MyResults;
