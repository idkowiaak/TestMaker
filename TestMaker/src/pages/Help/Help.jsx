import React from "react";
import "./Help.css";
import Sidebar from "../../components/Sidebar/Sidebar";

function Help() {
  return (
    <div className="help-container">
      <Sidebar />
      <main className="main-help-content">
        <header className="help-content-header">
          <h1>Pomoc i Wsparcie</h1>
        </header>

        <section className="help-section">
          <div className="help-welcome-text">
            <p>
              Masz problem z działaniem aplikacji TestMaker, zauważyłeś błąd w
              aplikacji lub nie możesz połączyć się ze swoim kontem? Jesteśmy
              tutaj, aby Ci pomóc!
            </p>
          </div>

          <div className="help-cards-grid">
            <div className="help-card">
              <h3>Szybkie rozwiązania</h3>
              <ul>
                <li>
                  <strong>Błąd podczas testu:</strong> Odśwież stronę (F5 / Cmd
                  + R). Twój postęp zapisuje się automatycznie.
                </li>
                <li>
                  <strong>Problem z kodem PIN:</strong> Upewnij się, że nie ma w
                  nim spacji i wielkość liter jest poprawna.
                </li>
                <li>
                  <strong>Brak wyników:</strong> Odśwież zakładkę "My Results" –
                  czasami baza potrzebuje chwili na przetworzenie danych.
                </li>
              </ul>
            </div>

            <div className="help-card contact-box">
              <h3>Skontaktuj się z nami</h3>
              <p>
                Jeśli powyższe kroki nie pomogły, napisz bezpośrednio do naszego
                działu wsparcia technicznego. Odpowiadamy tak szybko, jak to
                możliwe!
              </p>

              <div className="contact-details">
                <p className="email-line">
                  E-mail: <strong>support@testmaker.com</strong>
                </p>
                <p className="hours-line">
                  <i>Poniedziałek – Piątek: 8:00 – 16:00</i>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Help;
