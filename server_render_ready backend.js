
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000; // Use Render's dynamic port

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Smartwatch", price: 99.99 },
  { id: 2, name: "Wireless Earbuds", price: 59.99 },
  { id: 3, name: "Bluetooth Speaker", price: 79.99 },
  { id: 4, name: "Portable Charger", price: 29.99 }
];

let cart = [];

app.get('/products', (req, res) => res.json(products));

app.get('/cart', (req, res) => res.json(cart));

app.post('/cart', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    res.status(201).json({ message: "Added to cart", cart });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete('/cart', (req, res) => {
  cart = [];
  res.json({ message: "Cart cleared" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
