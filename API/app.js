const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { pseudo, email, password } = req.body;
  const user = await User.create({ pseudo, email, password });
  res.json(user);
});

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  });
