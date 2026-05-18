import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";
import SettingsPage from "./pages/Settings/SettingsPage";
import Help from "./pages/Help/Help";
import MyResults from "./pages/MyResults/MyResults";

function App() {
  const currentRole = localStorage.getItem("userRole");
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
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/help" element={<Help />}></Route>
        <Route path="/myresults" element={<MyResults />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
