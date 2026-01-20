const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to products JSON file
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');

// Helper function to read products from file
async function readProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    throw new Error('Failed to read products data');
  }
}

// Helper function to write products to file
async function writeProducts(products) {
  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error writing products:', error);
    throw new Error('Failed to save products data');
  }
}

// GET /products - Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await readProducts();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /update-stock - Update stock for a product
app.post('/update-stock', async (req, res) => {
  try {
    const { id, newQuantity } = req.body;

    // Validation: Check if required fields are present
    if (id === undefined || newQuantity === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: id and newQuantity'
      });
    }

    // Validation: Check if newQuantity is negative
    if (newQuantity < 0) {
      return res.status(400).json({
        success: false,
        error: 'Stock quantity cannot be negative'
      });
    }

    // Validation: Check if newQuantity is a valid number
    if (typeof newQuantity !== 'number' || isNaN(newQuantity)) {
      return res.status(400).json({
        success: false,
        error: 'Stock quantity must be a valid number'
      });
    }

    // Read current products
    const products = await readProducts();

    // Find the product
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Update the stock
    products[productIndex].stock = newQuantity;

    // Save to file
    await writeProducts(products);

    // Return updated product
    res.json({
      success: true,
      data: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📦 Products endpoint: http://localhost:${PORT}/products`);
  console.log(`🔄 Update stock endpoint: http://localhost:${PORT}/update-stock`);
});