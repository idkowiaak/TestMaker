import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

function StudentDashboard({ role }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examCode, setExamCode] = useState("");
  const [enrolledExams, setEnrolledExams] = useState([]);
  const [completedExams, setCompletedExams] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedExams = localStorage.getItem("studentExams");
    if (savedExams) {
      setEnrolledExams(JSON.parse(savedExams));
    }

    const savedCompleted = localStorage.getItem("completedExams");
    if (savedCompleted) {
      setCompletedExams(JSON.parse(savedCompleted));
    }
  }, []);

  const handleEnterExam = async () => {
    if (!examCode.trim()) {
      alert("Proszę wpisać kod egzaminu!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/exams");
      if (!response.ok) throw new Error("Błąd serwera");

      const allExams = await response.json();
      const foundExam = allExams.find((e) => e.code === examCode.toUpperCase());

      if (foundExam) {
        const isAlreadyEnrolled = enrolledExams.some(
          (e) => e.id === foundExam.id,
        );

        if (isAlreadyEnrolled) {
          alert("Ten egzamin jest już na Twojej liście!");
        } else {
          const updatedExams = [...enrolledExams, foundExam];
          setEnrolledExams(updatedExams);
          localStorage.setItem("studentExams", JSON.stringify(updatedExams));

          alert(`Pomyślnie dodano egzamin: ${foundExam.name}`);
          setIsModalOpen(false);
          setExamCode("");
        }
      } else {
        alert("Nie znaleziono egzaminu o podanym kodzie!");
      }
    } catch (error) {
      alert("Wystąpił błąd podczas łączenia z serwerem.");
    }
  };

  const handleStartTest = (examId) => {
    navigate(`/test/${examId}`);
  };

  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <main className="main-content">
        <header className="content-header">
          <h1>Panel Ucznia</h1>
        </header>
        <section className="exams-section">
          <div className="student-content-section">
            <h2>Twoje przyszłe egzaminy</h2>
            <button
              className="enter-code-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Wprowadź kod egzaminu
            </button>
          </div>

          <div className="exams-grid">
            {enrolledExams.length === 0 ? (
              <div className="exam-card placeholder-card">
                <h3>Brak testów</h3>
                <p>
                  Kliknij przycisk powyżej i wprowadź kod od nauczyciela, aby
                  dołączyć do egzaminu.
                </p>
              </div>
            ) : (
              enrolledExams.map((exam) => {
                const attempts = completedExams[exam.id] || 0;
                const isLocked = attempts > 0 && !exam.allowMultiple;

                return (
                  <div key={exam.id} className="exam-card">
                    <h3>{exam.name}</h3>
                    <p>
                      <strong>Czas na rozwiązanie:</strong> {exam.time} min
                    </p>
                    <p>
                      <strong>Liczba pytań:</strong>{" "}
                      {exam.tasks ? exam.tasks.length : 0}
                    </p>
                    <p>
                      <strong>Podejścia wielokrotne:</strong>{" "}
                      {exam.allowMultiple ? "Tak" : "Nie"}
                    </p>

                    <div className="teacherdashboard-btn-container">
                      <button
                        className="add-student-btn"
                        onClick={() => !isLocked && handleStartTest(exam.id)}
                        disabled={isLocked}
                      >
                        {isLocked
                          ? "Niedostępny (Rozwiązano)"
                          : attempts > 0
                            ? "Rozwiąż ponownie"
                            : "Rozpocznij test"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <header className="modal-header">
              <h2>Dołącz do egzaminu</h2>
              <button
                className="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </header>

            <div className="modal-body">
              <label>Kod egzaminu:</label>
              <input
                type="text"
                placeholder="np. XY7Z8B"
                className="modal-input"
                value={examCode}
                onChange={(e) => setExamCode(e.target.value)}
                maxLength="6"
              />
            </div>

            <footer className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Anuluj
              </button>
              <button className="save-exam-btn" onClick={handleEnterExam}>
                Dołącz
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
