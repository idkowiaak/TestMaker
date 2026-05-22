import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TestPage.css";

function TestPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/exams");
        if (response.ok) {
          const allExams = await response.json();
          const foundExam = allExams.find((e) => e.id === parseInt(examId));

          if (foundExam) {
            const completedExams = JSON.parse(
              localStorage.getItem("completedExams") || "{}",
            );
            if (completedExams[foundExam.id] && !foundExam.allowMultiple) {
              alert("Już wykorzystałeś swoje podejście do tego egzaminu!");
              navigate("/student");
              return;
            }

            setExam(foundExam);
            setTimeLeft(foundExam.time * 60);
          } else {
            alert("Nie znaleziono egzaminu!");
            navigate("/student");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchExam();
  }, [examId, navigate]);

  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted || !exam) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, exam]);

  const handleOptionSelect = (taskId, optionIndex) => {
    if (isSubmitted) return;
    setAnswers({
      ...answers,
      [taskId]: optionIndex,
    });
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    let currentScore = 0;
    exam.tasks.forEach((task) => {
      const selectedOptionIndex = answers[task.id];
      if (selectedOptionIndex !== undefined) {
        if (task.options[selectedOptionIndex].isCorrect) {
          currentScore += 1;
        }
      }
    });

    setScore(currentScore);
    setIsSubmitted(true);

    const completedExams = JSON.parse(
      localStorage.getItem("completedExams") || "{}",
    );
    completedExams[exam.id] = (completedExams[exam.id] || 0) + 1;
    localStorage.setItem("completedExams", JSON.stringify(completedExams));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!exam) {
    return <div className="test-loading">Ładowanie egzaminu...</div>;
  }

  return (
    <div className="test-page-container">
      <header className="test-header">
        <div className="test-header-info">
          <h1>{exam.name}</h1>
          <p>Udziel odpowiedzi na poniższe pytania. Powodzenia!</p>
        </div>
        <div className={`test-timer ${timeLeft < 60 ? "time-warning" : ""}`}>
          Czas: <span>{formatTime(timeLeft)}</span>
        </div>
      </header>

      <main className="test-content">
        {isSubmitted ? (
          <div className="test-result-box">
            <h2>Koniec egzaminu!</h2>
            <p className="score-text">
              Twój wynik: <strong>{score}</strong> / {exam.tasks.length} punktów
            </p>
            <button className="return-btn" onClick={() => navigate("/student")}>
              Wróć do panelu
            </button>
          </div>
        ) : (
          <div className="test-questions">
            {exam.tasks.map((task, index) => (
              <div key={task.id} className="test-question-card">
                <h3>Pytanie {index + 1}</h3>
                <p className="task-text">{task.text}</p>

                <div className="test-options">
                  {task.options.map((option, optIdx) => (
                    <label
                      key={optIdx}
                      className={`test-option-label ${answers[task.id] === optIdx ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`task-${task.id}`}
                        checked={answers[task.id] === optIdx}
                        onChange={() => handleOptionSelect(task.id, optIdx)}
                      />
                      <span className="option-letter-badge">
                        {option.letter}
                      </span>
                      <span className="option-text">{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="test-footer">
              <button className="submit-test-btn" onClick={handleSubmit}>
                Zakończ i wyślij odpowiedzi
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TestPage;
