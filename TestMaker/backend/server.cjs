const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const usersDB = [];
const EXAMS_FILE = path.join(__dirname, "exams.json");
const JWT_SECRET = process.env.JWT_SECRET || "tokenpass";

const readExamsFromFile = () => {
  try {
    if (!fs.existsSync(EXAMS_FILE)) {
      fs.writeFileSync(EXAMS_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(EXAMS_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
};

const writeExamsToFile = (exams) => {
  try {
    fs.writeFileSync(EXAMS_FILE, JSON.stringify(exams, null, 2), "utf8");
  } catch (error) {}
};

const generateExamCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

app.get("/api/exams", (req, res) => {
  const exams = readExamsFromFile();
  res.json(exams);
});

app.post("/api/exams", (req, res) => {
  try {
    const { name, time, allowMultiple, tasks } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Nazwa egzaminu jest wymagana!" });
    }

    const exams = readExamsFromFile();

    const newExam = {
      id: Date.now(),
      code: generateExamCode(),
      name,
      time,
      allowMultiple,
      tasks,
    };

    exams.push(newExam);
    writeExamsToFile(exams);

    res
      .status(201)
      .json({ message: "Egzamin został utworzony!", exam: newExam });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Błąd serwera podczas tworzenia egzaminu." });
  }
});

app.delete("/api/exams/:id", (req, res) => {
  try {
    const examId = parseInt(req.params.id);
    let exams = readExamsFromFile();

    if (!exams.some((e) => e.id === examId)) {
      return res.status(404).json({ message: "Nie znaleziono egzaminu." });
    }

    exams = exams.filter((e) => e.id !== examId);
    writeExamsToFile(exams);

    res.json({ message: "Egzamin został usunięty." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Błąd serwera podczas usuwania egzaminu." });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Wszystkie pola są wymagane!" });
    }
    const userExists = usersDB.find(
      (u) => u.email === email || u.username === username,
    );
    if (userExists) {
      return res.status(400).json({
        message: "Użytkownik o takim loginie lub emailu już istnieje!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const finalRole = role === "teacher" ? "teacher" : "student";
    const newUser = {
      id: Date.now(),
      username,
      email,
      password: hashedPassword,
      role: finalRole,
    };
    usersDB.push(newUser);
    res
      .status(201)
      .json({ message: "Rejestracja pomyślna! Możesz się teraz zalogować." });
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera podczas rejestracji." });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = usersDB.find((u) => u.username === username);
    if (!user)
      return res.status(400).json({ message: "Błędny login lub hasło!" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Błędny login lub hasło!" });
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" },
    );
    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera podczas logowania." });
  }
});

app.post("/api/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Brak autoryzacji!" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, role: decoded.role, username: decoded.username });
  } catch (error) {
    res.status(401).json({ message: "Token jest nieprawidłowy lub wygasł!" });
  }
});
app.put("/api/exams/:id", (req, res) => {
  try {
    const examId = parseInt(req.params.id);
    const { name, time, allowMultiple, tasks } = req.body;
    let exams = readExamsFromFile();

    const examIndex = exams.findIndex((e) => e.id === examId);
    if (examIndex === -1) {
      return res
        .status(404)
        .json({ message: "Nie znaleziono egzaminu do edycji." });
    }

    exams[examIndex] = {
      ...exams[examIndex],
      name,
      time,
      allowMultiple,
      tasks: tasks.filter((task) => task.text.trim() !== ""),
    };

    writeExamsToFile(exams);
    res.json({
      message: "Egzamin został zaktualizowany!",
      exam: exams[examIndex],
    });
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera podczas edycji egzaminu." });
  }
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`[OK] Bezpieczny backend działa na porcie ${PORT}`),
);
