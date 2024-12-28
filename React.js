import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  // State to manage cart items
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch products from a mock API (FakeStore API)
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Add items to the cart
  const addToCart = (product, quantity) => {
    const newCart = [...cart];
    const existingProductIndex = newCart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      newCart[existingProductIndex].quantity += quantity;
    } else {
      newCart.push({ ...product, quantity });
    }

    setCart(newCart);
    setCartItemCount(newCart.reduce((total, item) => total + item.quantity, 0));
  };

  // Render the Header component
  const Header = () => (
    <header>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/shop">Shop</Link> | 
        <Link to="/cart">Go to Cart ({cartItemCount})</Link>
      </nav>
    </header>
  );

  // Product card component to display individual products
  const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => setQuantity(Math.max(1, quantity - 1));

    const handleAddToCart = () => {
      addToCart(product, quantity);
    };

    return (
      <div className="product-card">
        <img src={product.image} alt={product.title} width="100" />
        <h3>{product.title}</h3>
        <div>
          <button onClick={handleDecrement}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={handleIncrement}>+</button>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    );
  };

  // Cart page to display items added to cart
  const Cart = () => (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.title} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}</h3>
    </div>
  );

  // Shop page to display all products
  const Shop = () => (
    <div>
      <h2>Shop</h2>
      <div className="products">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <h1>Welcome to our Store!</h1>
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
