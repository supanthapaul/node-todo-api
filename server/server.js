const express = require('express');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err));
});

// GET /todos
app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(err => res.status(400).send(err));
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send({ error: 'Todo not found' });
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({ error: 'Todo not found' });
      }
      res.send({ todo });
    })
    .catch(err => res.status(400).send());
});

app.listen(port, () => console.log('Started on port ' + port));

module.exports = { app };