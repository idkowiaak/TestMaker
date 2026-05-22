import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";
import SettingsPage from "./pages/Settings/SettingsPage";
import Help from "./pages/Help/Help";
import MyResults from "./pages/MyResults/MyResults";
import StudentsResults from "./pages/StudentsResults/StudentsResults";
import ClassroomManagement from "./pages/ClassroomManagement/ClassroomManagement";

function App() {
  const currentRole = localStorage.getItem("userRole");

  useEffect(() => {
    const savedTheme = localStorage.getItem("appTheme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboard role={currentRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute requiredRole="student" role={currentRole}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/myresults" element={<MyResults />} />
        <Route path="/studentsresults" element={<StudentsResults />} />
        <Route path="/classroommanagement" element={<ClassroomManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
