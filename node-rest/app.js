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

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});
const Product = mongoose.model('Product', productSchema);

// connection

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

app.get('/api/v1/products', async (req, res) => {
  const products = await Product.find();
  if (!products.length) {
    res.status(200).json({ status: 'Fail', message: 'No products yet' });
  }
  res.status(200).json({ Status: 'Success', result: products });
});
app.get('/api/v1/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res
        .status(404)
        .json({ status: 'Fail', message: `No product with matching id ${id}` });
    }
    res.status(200).json({ status: 'Success', result: product });
  } catch (error) {
    res
      .status(404)
      .json({ status: 'Fail', message: `No product with matching id ${id}` });
  }
});

app.post('/api/v1/add-product', async (req, res) => {
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    res.status(400).json({ Status: 'Fail', message: 'All field are required' });
  }
  const newProduct = await Product.create({ title, description, price });
  res.status(201).json({ Status: 'Success' });
});
app.patch('/api/v1/update-product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      res
        .status(404)
        .json({ status: 'Fail', message: `No product with matching id ${id}` });
    }
    // product.price = req.body.price || product.price;
    // product.description = req.body.description || product.description;
    // product.title = req.body.title || product.title;
    // product.save();

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        runValidators: true,
      }
    );

    res.status(200).json({
      Status: 'Success',
      message: `Product with id ${id} has been updated`,
    });
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: `No product with matching id ${id}`,
    });
  }
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
