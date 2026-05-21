import React, { useState, useEffect } from "react";
import "./TeacherDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";

function TeacherDashboard({ role }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examName, setExamName] = useState("");
  const [examTime, setExamTime] = useState("");
  const [allowMultiple, setAllowMultiple] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "",
      isClosed: true,
      options: [{ letter: "A", text: "", isCorrect: true }],
    },
  ]);
  const [exams, setExams] = useState([]);

  const [editingExamId, setEditingExamId] = useState(null);

  const API_URL = "http://localhost:8080/api/exams";

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setExams(data);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania egzaminów:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingExamId(null);
    setExamName("");
    setExamTime("");
    setAllowMultiple(false);
    setTasks([
      {
        id: 1,
        text: "",
        isClosed: true,
        options: [{ letter: "A", text: "", isCorrect: true }],
      },
    ]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (exam) => {
    setEditingExamId(exam.id);
    setExamName(exam.name);
    setExamTime(exam.time);
    setAllowMultiple(exam.allowMultiple);
    setTasks(JSON.parse(JSON.stringify(exam.tasks)));
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    const newId = Date.now();
    setTasks([
      ...tasks,
      {
        id: newId,
        text: "",
        isClosed: true,
        options: [{ letter: "A", text: "", isCorrect: true }],
      },
    ]);
  };

  const handleTaskChange = (id, value) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: value } : task,
    );
    setTasks(updatedTasks);
  };

  const handleAddOption = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const nextLetter = String.fromCharCode(65 + task.options.length);
        return {
          ...task,
          options: [
            ...task.options,
            { letter: nextLetter, text: "", isCorrect: false },
          ],
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleOptionChange = (taskId, optionIndex, value) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedOptions = task.options.map((opt, idx) =>
          idx === optionIndex ? { ...opt, text: value } : opt,
        );
        return { ...task, options: updatedOptions };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSetCorrectOption = (taskId, optionIndex) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedOptions = task.options.map((opt, idx) => ({
          ...opt,
          isCorrect: idx === optionIndex,
        }));
        return { ...task, options: updatedOptions };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSaveExam = async () => {
    if (!examName.trim()) {
      alert("Proszę podać nazwę egzaminu!");
      return;
    }

    const examData = {
      name: examName,
      time: examTime,
      allowMultiple: allowMultiple,
      tasks: tasks.filter((task) => task.text.trim() !== ""),
    };

    const url = editingExamId ? `${API_URL}/${editingExamId}` : API_URL;
    const method = editingExamId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examData),
      });

      if (response.ok) {
        await fetchExams();
        setIsModalOpen(false);
        setEditingExamId(null);
      } else {
        const errData = await response.json();
        alert(errData.message || "Coś poszło nie tak.");
      }
    } catch (error) {
      alert("Błąd połączenia z serwerem.");
    }
  };

  const handleRemoveExam = async (examId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten egzamin?")) return;
    try {
      const response = await fetch(`${API_URL}/${examId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setExams(exams.filter((exam) => exam.id !== examId));
      } else {
        alert("Nie udało się usunąć egzaminu.");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania egzaminu:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <main className="main-content">
        <header className="content-header">
          <h1>Panel Nauczyciela</h1>
          <button className="create-exam-btn" onClick={handleOpenCreateModal}>
            Stwórz nowy test
          </button>
        </header>

        <section className="exams-section">
          <h2>Twoje aktywne egzaminy</h2>
          <div className="exams-grid">
            {exams.length === 0 ? (
              <div className="exam-card placeholder-card">
                <h3>Brak utworzonych testów</h3>
                <p>
                  Kliknij przycisk powyżej, aby dodać swój pierwszy egzamin.
                </p>
              </div>
            ) : (
              exams.map((exam) => (
                <div key={exam.id} className="exam-card">
                  <h3>{exam.name}</h3>
                  <p>
                    <strong>Czas:</strong> {exam.time} min
                  </p>
                  <p>
                    <strong>Podejścia wielokrotne:</strong>{" "}
                    {exam.allowMultiple ? "Tak" : "Nie"}
                  </p>

                  <div className="exam-card-tasks">
                    <h4>Zadania:</h4>
                    <ul>
                      {exam.tasks.map((task, index) => (
                        <li key={task.id || index}>
                          <strong>Zadanie {index + 1}:</strong> {task.text}
                          {task.options && task.options.length > 0 && (
                            <div className="exam-card-options">
                              {task.options.map((opt, oIdx) => (
                                <span
                                  key={opt.letter || oIdx}
                                  className={`exam-option-item ${opt.isCorrect ? "correct-answer-highlight" : ""}`}
                                >
                                  <strong>{opt.letter}:</strong>{" "}
                                  {opt.text || "..."}
                                </span>
                              ))}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                    <div className="teacherdashboard-btn-container">
                      <button
                        className="add-student-btn"
                        onClick={() => alert(`Kod dla uczniów: ${exam.code}`)}
                      >
                        Przekaż kod
                      </button>
                      <button
                        className="edit-test-btn"
                        onClick={() => handleOpenEditModal(exam)}
                      >
                        Edytuj
                      </button>
                      <button
                        className="remove-test-btn"
                        onClick={() => handleRemoveExam(exam.id)}
                      >
                        Usuń
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <header className="modal-header">
              <h2>{editingExamId ? "Edytuj Egzamin" : "Nowy Egzamin"}</h2>
              <button
                className="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </header>

            <div className="modal-body">
              <label>Nazwa egzaminu:</label>
              <input
                type="text"
                placeholder="np. test wiedzy ogólnej"
                className="modal-input"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
              />

              <label>Czas trwania (minuty):</label>
              <input
                type="number"
                placeholder="np. 45"
                className="modal-input"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
              />

              <div className="allow-multiple-box">
                <input
                  type="checkbox"
                  id="multiple-attempts"
                  checked={allowMultiple}
                  onChange={(e) => setAllowMultiple(e.target.checked)}
                />
                <label htmlFor="multiple-attempts">
                  Zezwól na wielokrotne podejścia
                </label>
              </div>

              <hr />
              <h3>Zadania</h3>
              <div className="tasks-list">
                {tasks.map((task, index) => (
                  <div key={task.id} className="task-item">
                    <div className="task-item-header">
                      <span>
                        <strong>Zadanie {index + 1}</strong>
                      </span>
                    </div>

                    <textarea
                      placeholder="Wpisz treść zadania..."
                      value={task.text}
                      onChange={(e) =>
                        handleTaskChange(task.id, e.target.value)
                      }
                    />

                    <div className="options-container">
                      {task.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="option-input-wrapper"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <input
                            type="radio"
                            name={`correct-answer-${task.id}`}
                            checked={option.isCorrect || false}
                            onChange={() =>
                              handleSetCorrectOption(task.id, optionIndex)
                            }
                          />

                          <span className="option-letter">
                            {option.letter}:
                          </span>
                          <input
                            type="text"
                            placeholder={`Wpisz odpowiedź ${option.letter}...`}
                            className="modal-input option-input"
                            value={option.text}
                            onChange={(e) =>
                              handleOptionChange(
                                task.id,
                                optionIndex,
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-option-btn"
                        onClick={() => handleAddOption(task.id)}
                      >
                        + Dodaj odpowiedź{" "}
                        {String.fromCharCode(65 + task.options.length)}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="add-task-btn" onClick={handleAddTask}>
                Dodaj kolejne zadanie
              </button>
            </div>

            <footer className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Anuluj
              </button>
              <button className="save-exam-btn" onClick={handleSaveExam}>
                {editingExamId ? "Zapisz zmiany" : "Utwórz"}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
