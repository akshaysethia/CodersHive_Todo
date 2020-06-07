

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flash = require('express-flash');
const session = require('express-session');
var User = require('./models/user.model');
const passport = require('passport');
const initializePassport = require('./authenticate');
initializePassport(passport);

const app = express();
const port = process.env.PORT || 5001;

const uri = 'mongodb+srv://mohitjain:root@cluster0-sfxvn.gcp.mongodb.net/test?retryWrites=true&w=majority';
const connection = mongoose.connect(process.env.MONGODB_URI || uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

connection.then((db) => console.log("MongoDB database connection established successfully"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV == "production") {
  app.use(express.static('frontend/build'));
}

const todosRouter = require('./routes/todos');
const usersRouter = require('./routes/users');

app.use('/todos', todosRouter);
app.use('/users', usersRouter);

app.use(express.static('build'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});