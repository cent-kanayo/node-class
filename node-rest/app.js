const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const notesRouter = require('./routes/notesRouter');
const userRouter = require('./routes/userRouter');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// Model

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

app.use('/api/V1', userRouter);
app.use('/api/v1', notesRouter);

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
app.patch('/api/v1/update-product/:title', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ title: title });
    if (!product) {
      res
        .status(404)
        .json({ status: 'Fail', message: `No product with matching id ${id}` });
    }
    // product.price = req.body.price || product.price;
    // product.description = req.body.description || product.description;
    // product.title = req.body.title || product.title;
    // product.save();

    const updatedProduct = await Product.findOneAndUpdate(
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

// app.all('*', (req, res) => {
//   res.status(404).json({ status: 'Fail', result: 'This route does not exist' });
// });
app.use(errorHandler);
app.use(notFound);
