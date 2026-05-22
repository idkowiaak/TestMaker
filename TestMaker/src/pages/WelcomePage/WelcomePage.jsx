import React, { useState } from "react";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regRole, setRegRole] = useState("student");

  const handleLogin = async () => {
    if (!loginUsername.trim() || !loginPassword.trim()) {
      alert("Proszę podać login i hasło");
      return;
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);

      if (data.user.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    } catch (error) {
      alert("Brak połączenia z serwerem bazy danych!");
    }
  };

  const handleRegister = async () => {
    if (!regUsername.trim() || !regEmail.trim() || !regPassword.trim()) {
      alert("Uzupełnij wszystkie pola rejestracji!");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      alert("Hasła nie są identyczne!");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
          role: regRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);
      setIsModalOpen(false);
      setRegUsername("");
      setRegEmail("");
      setRegPassword("");
      setRegConfirmPassword("");
      setRegRole("student");
    } catch (error) {
      alert("Nie udało się wysłać formularza rejestracji.");
    }
  };

  return (
    <div className="WelcomePage-container">
      <div className="left-side-wp">
        <div className="left-side-content">
          <h1>TestMaker</h1>
          <p>
            Kompleksowa platforma do błyskawicznej weryfikacji wiedzy online.
            Przenieś sprawdzanie na wyższy poziom z pełną ochroną przed
            ściąganiem i automatycznym systemem oceniania.
          </p>
        </div>
      </div>
      <div className="right-side-wp">
        <div className="right-side-wp-content-container">
          <h2>Zaloguj się</h2>
          <input
            type="text"
            placeholder="Wprowadź nazwę"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="hasło"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <a href="#" className="forgot-password">
            Zapomniałeś hasła?
          </a>
          <div className="btn-wp">
            <button className="login-btn" onClick={handleLogin}>
              Zaloguj się!
            </button>
            <a
              href="#"
              className="register-link"
              type="submit"
              onClick={() => setIsModalOpen(true)}
            >
              Zarejestruj się
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <header className="modal-header">
              <h2>Zarejestruj się</h2>
              <button
                className="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </header>

            <div className="modal-body">
              <label>Nazwa użytkownika:</label>
              <input
                type="text"
                placeholder="np. JanKowalski"
                className="modal-input"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
              />

              <label>Adres E-mail:</label>
              <input
                type="email"
                placeholder="np. jan.kowalski@email.com"
                className="modal-input"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
              <label>Typ konta:</label>
              <div className="role-selection-box">
                <div>
                  <input
                    type="checkbox"
                    id="role-student"
                    checked={regRole === "student"}
                    onChange={() => setRegRole("student")}
                  />
                  <label htmlFor="role-student">Uczeń</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="role-teacher"
                    checked={regRole === "teacher"}
                    onChange={() => setRegRole("teacher")}
                  />
                  <label htmlFor="role-teacher">Nauczyciel</label>
                </div>
              </div>

              <label>Hasło:</label>
              <input
                type="password"
                placeholder="Wprowadź hasło"
                className="modal-input"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />

              <label>Powtórz hasło:</label>
              <input
                type="password"
                placeholder="Wpisz hasło ponownie"
                className="modal-input"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
              />

              <div className="allow-multiple-box">
                <input type="checkbox" id="terms-accept" required />
                <label htmlFor="terms-accept">
                  Akceptuję <a href="">regulamin</a> aplikacji TestMaker
                </label>
              </div>
            </div>

            <footer className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Anuluj
              </button>
              <button className="save-exam-btn" onClick={handleRegister}>
                Zarejestruj
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;
