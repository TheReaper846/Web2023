const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const User = require("./user");
const Library = require("./library");
const bookController = require("./bookController");

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

app.get("/profile", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(req.session.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

app.get("/library/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const library = await Library.find({ user: userId });
    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }
    res.status(200).json({ library });
  } catch (error) {
    res.status(500).json({ message: "Error fetching library", error });
  }
});

app.post("/books", async (req, res) => {
  const { title, authors, isbn, img } = req.body;

  try {
    const book = new Book({ title, authors, isbn, img });
    await book.save();
    res.status(201).json({ message: "Book saved successfully", book });
  } catch (error) {
    res.status(400).json({ message: "Error saving book", error });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
