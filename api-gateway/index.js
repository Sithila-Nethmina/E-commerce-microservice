const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());

// Serve Dashboard Frontend
app.use('/dashboard', express.static(path.join(__dirname, '..', 'dashboard')));

// Service Registry - Maps routes to microservice URLs
const services = {
  products: 'http://localhost:3001',
  customers: 'http://localhost:3002',
  orders: 'http://localhost:3003',
  payments: 'http://localhost:3004',
};

// Setup proxy routes for each microservice
Object.entries(services).forEach(([path, target]) => {
  app.use(
    `/${path}`,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (pathStr) => pathStr, // Keep the path as-is
      onProxyReq: (proxyReq, req) => {
        console.log(`[Gateway] ${req.method} ${req.originalUrl} -> ${target}${req.originalUrl}`);
      },
      onError: (err, req, res) => {
        console.error(`[Gateway] Error proxying to ${target}:`, err.message);
        res.status(503).json({
          error: 'Service Unavailable',
          message: `The ${path} service is currently unavailable`,
          service: path,
        });
      },
    })
  );
});

// Gateway Home - Service Directory
app.get('/', (req, res) => {
  res.json({
    service: 'API Gateway',
    description: 'E-Commerce Microservices API Gateway',
    availableServices: Object.entries(services).map(([name, url]) => ({
      name,
      gatewayUrl: `http://localhost:${PORT}/${name}`,
      directUrl: url,
      swaggerDocs: {
        direct: `${url}/api-docs`,
        viaGateway: `http://localhost:${PORT}/${name}/api-docs`,
      },
    })),
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.json({
    service: 'API Gateway',
    status: 'UP',
    port: PORT,
    connectedServices: Object.keys(services),
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  API Gateway running on http://localhost:${PORT}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n  Connected Microservices:`);
  Object.entries(services).forEach(([name, url]) => {
    console.log(`    - ${name.padEnd(12)} -> ${url}`);
    console.log(`      Swagger: http://localhost:${PORT}/${name}/api-docs`);
  });
  console.log(`\n${'='.repeat(60)}\n`);
});
