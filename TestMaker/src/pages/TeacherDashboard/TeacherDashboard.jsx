import React, { useState } from "react";
import "./TeacherDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
function TeacherDashboard({ role }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([{ id: 1, text: "" }]);
  const handleAddTask = () => {
    const newId = tasks.length + 1;
    setTasks([...tasks, { id: newId, text: "" }]);
  };

  const handleTaskChange = (id, value) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: value } : task,
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <main className="main-content">
        <header className="content-header">
          <h1>Panel Nauczyciela</h1>
          <button
            className="create-exam-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Stwórz nowy test
          </button>
        </header>
        <section className="exams-section">
          <h2>Twoje aktywne egzaminy</h2>
          <div className="exams-grid">
            <div className="exam-card placeholder-card">
              <h3>Brak utworzonych testów</h3>
              <p>Kliknij przycisk powyżej, aby dodać swój pierwszy egzamin.</p>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <header className="modal-header">
              <h2>Nowy Egzamin</h2>
              <button
                className="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
              ></button>
            </header>

            <div className="modal-body">
              <label>Nazwa egzaminu:</label>
              <input
                type="text"
                placeholder="np. test wiedzy ogólnej"
                className="modal-input"
              />

              <label>Czas trwania:</label>
              <input
                type="number"
                placeholder="np. 45"
                className="modal-input"
              />

              <div className="allow-multiple-box">
                <input type="checkbox" id="multiple-attempts" />
                <label htmlFor="multiple-attempts">
                  Zezwól na wielokrotne podejścia
                </label>
              </div>

              <hr />

              <h3>Zadania</h3>
              <div className="tasks-list">
                {tasks.map((task, index) => (
                  <div key={task.id} className="task-item">
                    <label>Zadanie {index + 1}:</label>
                    <textarea
                      placeholder="Wpisz treść zadania..."
                      value={task.text}
                      onChange={(e) =>
                        handleTaskChange(task.id, e.target.value)
                      }
                    />
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
              <button
                className="save-exam-btn"
                onClick={() => {
                  alert("Zapisano test!(TEST)");
                  setIsModalOpen(false);
                }}
              >
                Utwórz
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
