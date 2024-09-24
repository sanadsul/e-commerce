# 🛒 E-Commerce API

### A robust backend system for e-commerce platforms, built with **Node.js**, **Express.js**, and **MongoDB**.

---

## 📝 Project Overview

This **E-Commerce API** is a feature-rich backend solution designed to handle various e-commerce operations. It manages user authentication, product catalog management, shopping cart, and order processing. Key technologies like **JWT** for authentication and **Joi** for data validation ensure secure and reliable operations.

### 🔑 Core Features:
- **User Authentication** (Registration, Login with JWT)
- **Product Management** (CRUD operations for products)
- **Shopping Cart** (Add, remove, and view items)
- **Order Management** (Create and manage orders)
- **Input Validation** using **Joi**

---

## 📂 Project Structure

The following is an overview of the main files and folders:

### 📁 Configurations
- **`configs/db.js`**: MongoDB connection settings.
- **`configs/jwt.js`**: JSON Web Token (JWT) configuration for authentication.

### 📁 Controllers
- **`controllers/auth.Controller.js`**: Handles authentication (login, registration, password hashing).
- **`controllers/cartController.js`**: Manages shopping cart logic (adding/removing items).
- **`controllers/orderController.js`**: Manages order creation, viewing, and updating.
- **`controllers/productController.js`**: Product CRUD operations (create, read, update, delete).

### 📁 Middlewares
- **`middlewares/ValidatorJoi.js`**: Validates user input using Joi schemas.
- **`middlewares/isAuthenticate.js`**: Verifies user authentication using JWT tokens.

### 📁 Models
- **`models/Cart.model.js`**: Schema and model for shopping cart management.
- **`models/Order.model.js`**: Schema and model for managing orders.
- **`models/Product.model.js`**: Schema and model for product management.
- **`models/User.model.js`**: Schema and model for user accounts and their roles.

### 📁 Routes
- **`routes/Cart.js`**: API routes for managing cart items (add, view, delete).
- **`routes/Order.js`**: API routes for creating and managing orders.
- **`routes/Product.js`**: API routes for managing products (CRUD operations).
- **`routes/auth.js`**: API routes for user registration and login.
- **`routes/index.js`**: Central route handler that combines all routes.

### 📁 Utility
- **`utils/errorHandlerUrl.js`**: A utility for handling and reporting errors related to URL paths.

### 📁 Server
- **`server.js`**: The entry point for the API, connects to MongoDB, sets up middleware, and defines routes.

---

## 📚 API Endpoints

Here is a summary of the available routes:

### 🔐 Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive a JWT token

### 🛒 Products
- `GET /products` - Fetch all products
- `POST /products` - Add a new product (Requires authentication)
- `PUT /products/:id` - Update a product (Requires authentication)
- `DELETE /products/:id` - Delete a product (Requires authentication)

### 🛍️ Cart
- `POST /cart` - Add a product to the cart (Requires authentication)
- `GET /cart` - Get the current user's cart (Requires authentication)
- `DELETE /cart/:id` - Remove a product from the cart (Requires authentication)

### 📦 Orders
- `POST /orders` - Create a new order (Requires authentication)
- `GET /orders` - Get all orders (Requires authentication)
  
### 📜 Scripts

Below are some useful npm scripts for this project:

- `npm start` - Starts the server in production mode.
- `npm run dev` - Starts the server in development mode (with nodemon for hot reloads).
- `npm test` - Run test cases (if any are implemented).

### 📚 Dependencies

Here are the main dependencies used in the project:

- `Express.js` - A fast, unopinionated, minimalist web framework for Node.js.
- `Mongoose` - An ODM (Object Data Modeling) library for MongoDB.
- `JWT` - JSON Web Token for secure authentication and authorization.
- `Joi` - A powerful schema description language and data validator for JavaScript.

### 🛡️ Security Features
- `Password Hashing` - User passwords are hashed using bcrypt before storing in the database.
- `JWT Authentication` - Secure user sessions using JSON Web Tokens (JWT) for stateless authentication.
- `Input Validation` - All user input is validated using Joi to prevent malformed requests and ensure data integrity.

### ⚖️ License

his project is licensed under the MIT License. See the LICENSE file for details.

👨‍💻 Author

Developed with ❤️ by **Sanad Suleman**  
Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/sanad-suleman-922005301) or visit my [GitHub](https://github.com/sanadsul) for more projects.


### 🚀 Getting Started


## 🔧 Prerequisites

To run this project locally, you'll need the following:
- **Node.js** (v14+)
- **MongoDB** (Local instance or cloud-based connection string)

### 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ecommerce-api.git
