const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const usersDB = [];

const JWT_SECRET = process.env.JWT_SECRET || "tokenpass";

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
    if (!user) {
      return res.status(400).json({ message: "Błędny login lub hasło!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Błędny login lub hasło!" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.json({
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    });
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
const PORT = 8080;
app.listen(PORT, () =>
  console.log(`[OK] Bezpieczny backend działa na porcie ${PORT}`),
);
