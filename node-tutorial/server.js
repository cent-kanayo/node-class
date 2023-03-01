const express = require('express');
const cors = require('cors');
const server = express();
const auth = require('./middleware/api');
const bodyParser = require('body-parser');

server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/', (resquest, response) => {
  response.send('Welcome');
});

server.post('/login', (req, res) => {
  const { password, email } = req.body;
  res.json({ email, password });
});

const products = [
  {
    id: 1,
    title: 'Airforce 1',
    price: 40000,
    size: 45,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
  {
    id: 2,
    title: 'Sketchers',
    price: 30000,
    size: 42,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
  {
    id: 6,
    title: 'Runners',
    price: 34000,
    size: 41,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
  {
    id: 5,
    title: 'Reebok',
    price: 54000,
    size: 44,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
  {
    id: 4,
    title: 'Jordan',
    price: 87000,
    size: 45,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
  {
    id: 3,
    title: 'Max',
    price: 20000,
    size: 48,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
];
server.get(
  '/products',
  function (request, response, next) {
    if (!request.query.apiKey) {
      return response.json({ message: 'No api key provided' });
    }
    if (request.query.apiKey !== 'my-api-key') {
      return response.json({ message: 'Invalid api key' });
    }
    if (request.query.apiKey === 'my-api-key') {
      return next();
    }
  },
  (request, response) => {
    const { price, sort } = request.query;
    let returnProducts = [...products];
    if (sort === 'desc') {
      returnProducts = returnProducts.sort(
        (productA, productB) => productB.id - productA.id
      );
    } else if (sort === 'asc') {
      returnProducts = returnProducts.sort(
        (productA, productB) => productA.id - productB.id
      );
    }
    if (price === 'desc') {
      returnProducts = returnProducts.sort(
        (productA, productB) => productB.price - productA.price
      );
    } else if (price === 'asc') {
      returnProducts = returnProducts.sort(
        (productA, productB) => productA.price - productB.price
      );
    }
    response.status(200).json({ message: 'Success', result: returnProducts });
  }
);

server.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === +id);
  res.json(product);
});
server.all('*', (req, res) => {
  res.send('404, route does not exist');
});

server.listen(3500, console.log('Server is listening on port 3500'));
