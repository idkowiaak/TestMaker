import React, { useState } from "react";
import "./SettingsPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
function SettingsPage({}) {
  return (
    <div className="settings-container">
      <Sidebar />
      <main className="main-settings-content">
        <header className="settings-content-header">
          <h1>Ustawienia</h1>
        </header>
        <section className="settings-section"></section>
      </main>
    </div>
  );
}

export default SettingsPage;
