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
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginUsername.trim() || !loginPassword.trim()) {
      alert("Proszę podać login i hasło");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/login", {
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

    if (!termsAccepted) {
      alert("Musisz zaakceptować regulamin!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
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
      setTermsAccepted(false);
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
        <form
          className="right-side-wp-content-container"
          onSubmit={handleLogin}
        >
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
            <button type="submit" className="login-btn">
              Zaloguj się!
            </button>
            <button
              type="button"
              className="register-link"
              onClick={() => setIsModalOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Zarejestruj się
            </button>
          </div>
        </form>
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
              <div
                className="role-selection-box"
                style={{ display: "flex", gap: "15px", marginBottom: "15px" }}
              >
                <div>
                  <input
                    type="radio"
                    name="role"
                    id="role-student"
                    checked={regRole === "student"}
                    onChange={() => setRegRole("student")}
                  />
                  <label htmlFor="role-student" style={{ marginLeft: "5px" }}>
                    Uczeń
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="role"
                    id="role-teacher"
                    checked={regRole === "teacher"}
                    onChange={() => setRegRole("teacher")}
                  />
                  <label htmlFor="role-teacher" style={{ marginLeft: "5px" }}>
                    Nauczyciel
                  </label>
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
                <input
                  type="checkbox"
                  id="terms-accept"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms-accept">
                  Akceptuję <a href="https://example.com/">regulamin</a>{" "}
                  aplikacji TestMaker
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
