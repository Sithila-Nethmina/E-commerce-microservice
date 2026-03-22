require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Product Service: Connected to MongoDB'))
  .catch(err => console.error('Product Service: MongoDB connection error:', err));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Service API',
      version: '1.0.0',
      description: 'Microservice for managing products in the e-commerce platform',
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Direct Access' },
      { url: 'http://localhost:3000', description: 'Via API Gateway' },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Swagger UI - Direct access
app.use('/api-docs', swaggerUi.serveFiles(swaggerDocs), swaggerUi.setup(swaggerDocs));

// Swagger UI - Via API Gateway (gateway forwards /products/api-docs as-is)
app.use('/products/api-docs', swaggerUi.serveFiles(swaggerDocs), swaggerUi.setup(swaggerDocs));

// Routes
app.use('/products', productRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'Product Service', status: 'UP', port: PORT });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Product Service running on http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});
