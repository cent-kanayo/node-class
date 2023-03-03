const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// Model

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  fullname: String,
});

const User = mongoose.model('User', userSchema);

mongoose
  .connect(process.env.DBCONNECT)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    console.log('Successfully connected to the database');
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3500;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// endpoints

app.get('/api/v1', (request, response) => {
  response.status(200).json({ status: 'Success', result: [] });
});

app.get('/api/v1/products', (req, res) => {
  res.status(200).json({ status: 'Success', result: [] });
});
app.get('/api/v1/products/:id', (req, res) => {
  res.json({ status: 'Success', result: [] });
});

app.post('/api/v1/register', async (req, res) => {
  const { fullname, email, password, cpassword } = req.body;
  if (!fullname || !password || !email || !cpassword) {
    res.status(400).json({ status: 'Fail', result: 'All fields are required' });
  }
  if (password !== cpassword) {
    res.status(400).json({ status: 'Fail', result: 'Password mismatch' });
  }

  const findUser = await User.findOne({ email: email });

  if (findUser) {
    res
      .status(400)
      .json({ status: 'Fail', result: 'This user already exists' });
  }

  const user = await User.create({
    email,
    password,
    fullname,
  });

  if (!user) {
    res.status(500).json({ status: 'Fail', result: 'Something went wrong' });
  }
  const getUser = await User.findById(user._id).select('-password');
  res.status(201).json({ status: 'Success', result: getUser });
});

app.post('/api/v1/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ status: 'Fail', result: 'All fields are required' });
  }
  const getUser = await User.findOne({ email });

  if (!getUser) {
    res.json({ status: 'Fail', result: 'Invalid credential' });
  }
  if (getUser.password === password) {
    const user = await User.findById(getUser._id).select('-password');
    res.json({ status: 'Success', result: user });
  } else {
    res.json({ status: 'Fail', result: 'Invalid credentials' });
  }
});

app.patch('/api/v1/update-user', (req, res) => {
  res.status(200).json({ status: 'Success', result: req.body });
});
app.delete('/api/v1/delete-user/:id', (req, res) => {
  res.status(200).json({ status: 'Success', result: req.body });
});

app.all('*', (req, res) => {
  res.status(404).json({ status: 'Fail', result: 'This route does not exist' });
});
