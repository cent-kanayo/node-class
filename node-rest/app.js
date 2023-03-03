const express = require('express');
const cors = require('cors');

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
  res.status(200).json({ status: 'Success', result: [] });
});

app.post('/api/v1/register', (req, res) => {
  res.status(201).json({ status: 'Success', result: req.body });
});

app.post('/api/v1/login', (req, res) => {
  res.status(200).json({ status: 'Success', result: req.body });
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

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
