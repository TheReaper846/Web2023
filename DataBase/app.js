const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const User = require("./user");

const app = express();
const PORT = process.env.PORT || 3000;

// URL de connexion
const url =
  "mongodb+srv://amsy158:Amine2001..@cluster0.hohoaks.mongodb.net/?retryWrites=true&w=majority";

// Options de connexion
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connexion à la base de données
mongoose
  .connect(url, options)
  .then(() => console.log("Connexion réussie !"))
  .catch((err) => console.error("Erreur de connexion :", err));

app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["randomKey"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.post("/signup", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = new User({ name, password });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.userId = user._id;
    res.status(200).json({ message: "Logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
