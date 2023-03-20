const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const User = require("./user");
const Library = require("./library");
const Book = require("./book");
const bookController = require("./bookController");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
let currentUser = null;
let currentUserId = null;

// URL de connexion
const url =
  "mongodb+srv://neile:o5wspUj8OfohVWB8@cluster0.rnble7p.mongodb.net/?retryWrites=true&w=majority";

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

app.use(cors());
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
    // Trouver l'utilisateur par son nom
    const user = await User.findOne({ name });

    // Si l'utilisateur n'existe pas ou que le mot de passe est incorrect, renvoyer une erreur
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Si l'utilisateur existe et que le mot de passe est correct, enregistrer l'ID de l'utilisateur dans la session
    req.session.userId = user._id;
    currentUser = name;
    res.status(200).json({ message: "Logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/library/:userId", async (req, res) => {
  const { userId } = req.params.userId;
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

app.post("/clear", async (req, res) => {
  try {
    await Book.deleteMany({});
    res.status(200).json({ message: "Books deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting books", error });
  }
});

app.get("/search", bookController.getAllBooks);

app.get("/bookstatus", async (req, res) => {
  const { title, isbn, userId } = req.query;

  try {
    const bookStatus = await Library.findOne({
      title: title,
      isbn: isbn,
      user: userId,
    });

    if (!bookStatus) {
      return res.status(404).json({ message: "Book status not found" });
    }

    let status = {};

    if (bookStatus.status === 0) {
      status = {
        status_0: true,
        status_1: false,
        status_2: false,
        status_3: false,
      };
    } else if (bookStatus.status === 1) {
      status = {
        status_0: false,
        status_1: true,
        status_2: false,
        status_3: false,
      };
    } else if (bookStatus.status === 2) {
      status = {
        status_0: false,
        status_1: false,
        status_2: true,
        status_3: false,
      };
    } else if (bookStatus.status === 3) {
      status = {
        status_0: false,
        status_1: false,
        status_2: false,
        status_3: true,
      };
    }

    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book status", error });
  }
});

app.get("/user", async (req, res) => {
  const { name } = currentUser;

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }

  currentUserId = user._id;
});

app.get("/currentUserId", async (req, res) => {
  const { name } = currentUser;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
