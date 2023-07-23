import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

//enabling cors
app.use(cors());

// Sample data for products
let products = [
  {
    id: 1,
    name: 'Product 1',
    category: 'Home',
    description: 'Product 1 description',
    imageURL: 'assets/img/1.jfif',
    price: 10,
    isActive: true
  },
  {
    id: 2,
    name: 'Product 2',
    category: 'Beauty',
    description: 'Product 2 description',
    imageURL: 'assets/img/2.jfif',
    price: 19,
    isActive: true
  },
  {
    id: 3,
    name: 'Product 3',
    category: 'Clothing',
    description: 'Product 3 description',
    imageURL: 'assets/img/3.jfif',
    price: 15,
    isActive: false
  }
];

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(`<h1>Welcome to Products API</h1>
    
    <p>Use any of the below API Endpoints</p>

    <ul>
        <li>{{baseURL}}/products <b>GET Request</b></li>
        <li>{{baseURL}}/product/:id <b>GET Request</b></li>
        <li>{{baseURL}}/product <b>POST Request</b></li>
        <li>{{baseURL}}/product/:id <b>PUT Request</b></li>
        <li>{{baseURL}}/product/:id <b>DELETE Request</b></li>
    </ul>

    <h3>Sample Product Schema</h3>
    <p>
    {
        id: 2,
        name: 'Product 2',
        category: 'Category 2',
        description: 'Product 2 description',
        imageURL: 'https://example.com/image2.jpg',
        price: 19.99,
        isActive: true
      }
    </p>
    `);
  });

// GET /products - Get all products
app.get('/products', (req, res) => {
  res.status(200).json({ message: "Success", data: products });
});

// GET /product/:id - Get a specific product by id
app.get('/product/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(product => product.id === id);

  if (!product) {
    res.status(404).json({ message: 'Product not found', data: null });
  } else {
    res.status(200).json({ message: 'Product not found', data: product });
  }
});

// POST /product - Add a new product
app.post('/product', (req, res) => {
  const { name, category, description, imageURL, price, isActive } = req.body;

  // Validate required information
  if (!name || !category || !price || !imageURL) {
    res.status(400).json({ message: 'Missing required information', data: null });
    return;
  }

  const id = Math.floor(Math.random() * 1000) + 1; // Generate a random id
  const newProduct = { id, name, category, description, imageURL, price, isActive };
  products.push(newProduct);

  res.status(201).json({ message: 'Success', data: newProduct });
});

// PUT /product/:id - Update a product
app.put('/product/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category, description, imageURL, price, isActive } = req.body;

  // Validate required information
  if (!name || !category || !price) {
    res.status(400).json({ message: 'Missing required information', data: null });
    return;
  }

  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1) {
    res.status(404).json({ message: 'Product not found', data: null });
  } else {
    products[productIndex] = {
      id,
      name,
      category,
      description,
      imageURL,
      price,
      isActive
    };
    res.status(200).json({message: 'Success', data:products[productIndex] });
  }
});

// DELETE /product/:id - Delete a product
app.delete('/product/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1) {
    res.status(404).json({ message: 'Product not found', data: null });
  } else {
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.status(200).json({message: 'Deleted', data: deletedProduct });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});