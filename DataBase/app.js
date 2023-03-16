const mongoose = require("mongoose");
const User = require("./user");
const Book = require("./book");
const CurrentBook = require("./currentBook");
const Library = require("./library");

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

// Utiliser les classes User, Book, CurrentBook et Library dans votre application
