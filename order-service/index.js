require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Order Service: Connected to MongoDB'))
  .catch(err => console.error('Order Service: MongoDB connection error:', err));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Service API',
      version: '1.0.0',
      description: 'Microservice for managing orders in the e-commerce platform',
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

// Swagger UI - Via API Gateway
app.use('/orders/api-docs', swaggerUi.serveFiles(swaggerDocs), swaggerUi.setup(swaggerDocs));

// Routes
app.use('/orders', orderRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'Order Service', status: 'UP', port: PORT });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});
