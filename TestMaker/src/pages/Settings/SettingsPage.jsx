import React, { useState, useEffect } from "react";
import "./SettingsPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";

function SettingsPage({ role }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("appTheme");
    return savedTheme === "light" ? false : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light-theme");
      localStorage.setItem("appTheme", "dark");
    } else {
      document.body.classList.add("light-theme");
      localStorage.setItem("appTheme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="settings-container">
      <Sidebar role={role} />
      <main className="main-settings-content">
        <header className="settings-content-header">
          <h1>Ustawienia</h1>
        </header>

        <div className="settings-grid">
          <section className="settings-card">
            <h2>Profil Użytkownika</h2>
            <form>
              <div className="settings-input-group">
                <label>Nazwa użytkownika</label>
                <input type="text" className="settings-input" />
              </div>

              <div className="settings-input-group">
                <label>Adres e-mail</label>
                <input type="email" className="settings-input" />
              </div>

              <button
                type="submit"
                className="settings-primary-btn"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Zapisano zmiany profilu TEST");
                }}
              >
                Zapisz zmiany profilu
              </button>
            </form>
          </section>

          <section className="settings-card">
            <h2>Zmiana Hasła</h2>
            <form>
              <div className="settings-input-group">
                <label>Obecne hasło</label>
                <input type="password" className="settings-input" />
              </div>

              <div className="settings-input-group">
                <label>Nowe hasło</label>
                <input type="password" className="settings-input" />
              </div>

              <button
                type="submit"
                className="settings-primary-btn"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Zaktualizowano hasło TEST");
                }}
              >
                Zaktualizuj hasło
              </button>
            </form>
          </section>

          <section className="settings-card">
            <h2>Preferencje</h2>

            <div className="settings-switch-row">
              <div className="settings-switch-info">
                <strong>Ciemny motyw aplikacji</strong>
                <span>Przełącz między jasnym a ciemnym wyglądem</span>
              </div>
              <label className="theme-toggle-switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <hr className="settings-divider" />

            <div className="settings-toggle-group">
              <input
                type="checkbox"
                id="notifications"
                className="settings-checkbox"
              />
              <label htmlFor="notifications">
                Otrzymuj powiadomienia e-mail o wynikach uczniów
              </label>
            </div>

            <div className="settings-toggle-group">
              <input type="checkbox" className="settings-checkbox" />
              <label htmlFor="weeklyReports">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </label>
            </div>

            <div className="settings-toggle-group">
              <input type="checkbox" className="settings-checkbox" />
              <label htmlFor="3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </label>
            </div>
            <div className="settings-toggle-group">
              <input type="checkbox" id="4" className="settings-checkbox" />
              <label htmlFor="soundEnabled">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </label>
            </div>
          </section>

          <section className="settings-card danger-zone">
            <h2>Strefa Niebezpieczna</h2>
            <p>
              Usunięcie konta jest nieodwracalne. Wszystkie Twoje dane, w tym
              utworzone egzaminy i wyniki uczniów, zostaną trwale usunięte z
              naszych serwerów.
            </p>
            <button
              className="settings-danger-btn"
              onClick={() => alert("Twoje konto zostało usunięte TEST")}
            >
              Usuń konto
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
