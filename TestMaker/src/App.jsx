import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
function App() {
  return (
    <div className="main-app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/teacher" element={<TeacherDashboard />}></Route>
          <Route path="/student" element={<StudentDashboard />}></Route>{" "}
          {/*Pozmieniać później te pathy*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
