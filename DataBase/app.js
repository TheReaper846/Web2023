const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const User = require("./user");
const Library = require("./library");
const Book = require("./book");
const bookController = require("./bookController");
const CurrentBook = require("./currentBook");
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
    currentUserId = user._id;
    currentUser = user.name;

    res.status(200).json({ message: "Logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  currentUserId = null;
  currentUser = null;
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

app.post("/currentbook", async (req, res) => {
  const { title, authors, isbn, img, description, publisher, publishedDate, categories, pageCount } = req.body;
  try {
    const currentBook = new CurrentBook({ title, authors, isbn, img, description, publisher, publishedDate, categories, pageCount });
    await currentBook.save();
    res.status(201).json({ message: "Book saved successfully", currentBook });
  } catch (error) {
    res.status(400).json({ message: "Error saving book", error });
  }
});
app.get("/currentbook", async (req, res) => {
  try {
    const currentBook = await CurrentBook.find();
    if (!currentBook) {
      return res.status(404).json({ message: "Current book not found" });
    }
    await CurrentBook.deleteMany({});
    res.status(200).json({ currentBook });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
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

app.get("/inlib?", async (req, res) => {
  try{
    const isbn = req.query.isbn;
    const inLibrary = await Library.findOne({isbn: isbn, user: currentUserId});
    if (inLibrary) {
      res.status(200).json({ inLibrary: true, status: inLibrary.status });
    }
    else {
      res.status(200).json({ inLibrary: false });
    }
  }catch(error){
    res.status(500).json({ message: "Error fetching book", error });
  }
});

app.post("/addToLibrary", (req, res) => {
  const { title, authors, isbn, img} = req.body;
  try {
    const book = new Library({ title, authors, isbn, img, user: currentUserId, status: 0 });
    book.save();
    res.status(201).json({ message: "Book saved successfully", book });
  } catch (error) {
    res.status(400).json({ message: "Error saving book", error });
  }
});

app.get("/removeBook?", async (req, res) => {
  const isbn = req.query.isbn;
  try {
    const deleted = await Library.deleteOne({isbn: isbn, user: currentUserId});
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting book", error });
  }
});

app.get("/setStatus?", async (req, res) => {
  const {isbn, status} = req.query;
  try {
    const updated = await Library.updateOne({isbn: isbn, user: currentUserId}, {status: parseInt(status)});
    if (updated.nModified === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully" });
  }catch(error){
    res.status(400).json({ message: "Error updating book", error });
  }
});

app.get("/user", async (req, res) => {
  const { name } = currentUser;
  let user;

  try {
    user = await User.findOne({ name: name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    currentUserId = user._id;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }


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
