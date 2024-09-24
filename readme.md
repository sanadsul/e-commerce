# E-Commerce API

## Project Overview

This is a Node.js-based backend for an e-commerce platform. It includes essential features for handling user authentication, product management, orders, and shopping cart functionality. The API leverages **Express.js** for handling routes, **MongoDB** for data storage, **JWT** for authentication, and **Joi** for input validation.

## Project Structure

Below is an overview of the main files and directories in this project:

### Configurations
- **`configs/db.js`**: MongoDB database connection configuration.
- **`configs/jwt.js`**: JSON Web Token (JWT) configuration for authentication.

### Controllers
- **`controllers/auth.Controller.js`**: Manages user authentication (login, registration, etc.).
- **`controllers/cartController.js`**: Handles the logic for shopping cart management.
- **`controllers/orderController.js`**: Manages order-related operations (create, update, etc.).
- **`controllers/productController.js`**: Handles product-related operations (CRUD for products).

### Middlewares
- **`middlewares/ValidatorJoi.js`**: Joi-based input validation middleware for validating user inputs.
- **`middlewares/isAuthenticate.js`**: Middleware to check if the user is authenticated by validating JWT tokens.

### Models
- **`models/Cart.model.js`**: Mongoose schema and model for managing the shopping cart.
- **`models/Order.model.js`**: Mongoose schema and model for managing orders.
- **`models/Product.model.js`**: Mongoose schema and model for products.
- **`models/User.model.js`**: Mongoose schema and model for user accounts.

### Routes
- **`routes/Cart.js`**: Routes related to cart management (add to cart, remove from cart, etc.).
- **`routes/Order.js`**: Routes related to order creation, updating, and viewing.
- **`routes/Product.js`**: Routes for CRUD operations on products.
- **`routes/auth.js`**: Routes for user authentication (login, registration, etc.).
- **`routes/index.js`**: Combines all routes into one central route handler.

### Utility
- **`utils/errorHandlerUrl.js`**: Utility for handling errors related to URL paths.

### Server
- **`server.js`**: The main entry point of the application, sets up the Express server and connects to MongoDB.

## Getting Started

### Prerequisites

- **Node.js** (v14+)
- **MongoDB** (running instance locally or a connection string to a cloud MongoDB instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ecommerce-api.git
