require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Payment Service: Connected to MongoDB'))
  .catch(err => console.error('Payment Service: MongoDB connection error:', err));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment Service API',
      version: '1.0.0',
      description: 'Microservice for managing payments in the e-commerce platform',
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
app.use('/payments/api-docs', swaggerUi.serveFiles(swaggerDocs), swaggerUi.setup(swaggerDocs));

// Routes
app.use('/payments', paymentRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'Payment Service', status: 'UP', port: PORT });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});
