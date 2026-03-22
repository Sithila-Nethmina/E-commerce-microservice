@echo off
echo ============================================================
echo   Starting E-Commerce Microservices
echo ============================================================
echo.

echo [1/5] Starting Product Service (Port 3001)...
start "Product Service" cmd /c "cd /d %~dp0product-service && npm start"
timeout /t 2 /nobreak > nul

echo [2/5] Starting Customer Service (Port 3002)...
start "Customer Service" cmd /c "cd /d %~dp0customer-service && npm start"
timeout /t 2 /nobreak > nul

echo [3/5] Starting Order Service (Port 3003)...
start "Order Service" cmd /c "cd /d %~dp0order-service && npm start"
timeout /t 2 /nobreak > nul

echo [4/5] Starting Payment Service (Port 3004)...
start "Payment Service" cmd /c "cd /d %~dp0payment-service && npm start"
timeout /t 2 /nobreak > nul

echo [5/5] Starting API Gateway (Port 3000)...
start "API Gateway" cmd /c "cd /d %~dp0api-gateway && npm start"
timeout /t 2 /nobreak > nul

echo.
echo ============================================================
echo   All services started!
echo ============================================================
echo.
echo   API Gateway:       http://localhost:3000
echo   Product Service:   http://localhost:3001/api-docs
echo   Customer Service:  http://localhost:3002/api-docs
echo   Order Service:     http://localhost:3003/api-docs
echo   Payment Service:   http://localhost:3004/api-docs
echo   Dashboard:         http://localhost:5500/dashboard
echo.
echo   Gateway Swagger:
echo     Products:  http://localhost:3000/products/api-docs
echo     Customers: http://localhost:3000/customers/api-docs
echo     Orders:    http://localhost:3000/orders/api-docs
echo     Payments:  http://localhost:3000/payments/api-docs
echo.
echo ============================================================
pause
