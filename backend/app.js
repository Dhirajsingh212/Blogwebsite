const Auth = require('./routes/Auth');
const Users = require('./routes/Users');
const Posts = require('./routes/Posts');
const Catagories = require('./routes/Catagories');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });
app.use('/images', express.static(path.join(__dirname, '/images')));

mongoose
  .connect(process.env.DB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
  })
  .then(() => {
    console.log('db is successfully connected');
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('file has been uploaded');
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', Auth);
app.use('/api/users', Users);
app.use('/api/posts', Posts);
app.use('/api/catagories', Catagories);

module.exports = app;
