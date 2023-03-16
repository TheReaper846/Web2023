const mongoose = require('mongoose');

// URL de connexion
const url = 'mongodb+srv://amsy158:Amine2001..@cluster0.hohoaks.mongodb.net/?retryWrites=true&w=majority';

// Options de connexion
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connexion à la base de données
mongoose.connect(url, options)
  .then(() => console.log('Connexion réussie !'))
  .catch(err => console.error('Erreur de connexion :', err));


// Schéma pour la table user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Schéma pour la table books
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

// Schéma pour la table currentBook
const currentBookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

// Schéma pour la table librarys
const librarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rank: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
});

// Créer des modèles à partir des schémas
const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const CurrentBook = mongoose.model('CurrentBook', currentBookSchema);
const Library = mongoose.model('Library', librarySchema);
