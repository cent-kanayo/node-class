const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());

server.get('/', (resquest, response) => {
  response.send('Welcome');
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
    id: 3,
    title: 'Runners',
    price: 34000,
    size: 41,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
  {
    id: 4,
    title: 'Reebok',
    price: 54000,
    size: 44,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
  {
    id: 5,
    title: 'Jordan',
    price: 87000,
    size: 45,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
  {
    id: 6,
    title: 'Max',
    price: 20000,
    size: 48,
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quaerat at rem. Odit laborum quam ex, hic autem veritatis tempore. ',
  },
];
server.get('/products', (request, response) => {
  //   const requestQuery = request.query;
  //   if (requestQuery.title) {
  //     response.status(200).json({ message: 'Success', data: requestQuery });
  //   }
  response.status(200).json({ message: 'Success', result: products });
});

server.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === +id);
  res.json(product);
});
server.post();
server.put();
server.patch();
server.delete();
server.options();
server.all('*', (req, res) => {
  res.send('404, route does not exist');
});

server.listen(3500, console.log('Server is listening on port 3500'));
