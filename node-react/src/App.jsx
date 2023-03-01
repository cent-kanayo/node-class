import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:3500/products?sort=desc'
      );
      setProducts(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSingleProducts = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3500/products/${id}`);
      setSingleProduct(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products.length) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <h1>Vite + React</h1>
      {singleProduct && (
        <article>
          <h3>{singleProduct?.title}</h3>
          <p>{singleProduct?.price}</p>
          <p>{singleProduct?.size}</p>
          <p>{singleProduct?.desc}</p>
        </article>
      )}

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {products.map(({ id, title, price, size }) => (
          <article key={id} onClick={() => fetchSingleProducts(id)}>
            <h3>{title}</h3>
            <p>{price}</p>
            <p>{size}</p>
          </article>
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
