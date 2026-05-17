import React from "react";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div className="WelcomePage-container">
      <div className="left-side-wp">
        <div className="left-side-content">
          <h1>TestMaker</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus alias quod eligendi quae labore modi consequatur
            maiores perferendis consequuntur voluptatem ipsam excepturi ducimus
            quisquam sapiente, assumenda aliquid quidem provident nemo!
          </p>
        </div>
      </div>
      <div className="right-side-wp">
        <div className="right-side-wp-content-container">
          <h2>Zaloguj się</h2>
          <input type="text" placeholder="Wprowadź nazwę" />
          <input type="password" placeholder="hasło" />
          <a href="#" className="forgot-password">
            Zapomniałeś hasła?
          </a>
          <div className="btn-wp">
            <button className="login-btn">Zaloguj się!</button>
            <a href="#" className="register-link">
              Zarejestruj się
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
