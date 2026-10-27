<<<<<<< HEAD
Need node version 18 or above. 
Its been deployed here is the link: https://mern-ecommerce-template.onrender.com/
=======
# MERN E-Commerce Store

A full-stack e-commerce application built with MongoDB, Express, React, and Node.js. Customers can browse and search a product catalog, manage a cart, place orders, and pay through PayPal. An admin area provides tools to manage products, users, and orders.

**Live demo:** [MERN Shop Template](https://mern-ecommerce-template.onrender.com/)

## Features

- Product catalog with keyword search, pagination, product details, ratings, and reviews
- Customer registration, login, profile management, and protected account pages
- Shopping cart with shipping, tax, and order-total calculations
- PayPal checkout with server-side payment verification
- Admin dashboard for product, user, and order management
- Product image uploads
- REST API backed by MongoDB and Mongoose
- Responsive React interface with Redux Toolkit and RTK Query

## Technology

| Area | Technologies |
| --- | --- |
| Frontend | React 18, React Router, Redux Toolkit, RTK Query, React Bootstrap |
| Backend | Node.js (ES modules), Express |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens, HTTP-only cookies, bcrypt |
| Payments | PayPal |
| Uploads | Multer, local `uploads/` directory |

## Getting started

### Prerequisites

- Node.js 18 or newer and npm
- A MongoDB database (local or hosted)
- PayPal developer sandbox credentials to test checkout

### 1. Install dependencies

From the repository root:

```bash
npm install
npm install --prefix frontend
```

### 2. Configure environment variables

Create a `.env` file in the repository root:

```dotenv
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_ecommerce
JWT_SECRET=replace-this-with-a-long-random-secret
PAGINATION_LIMIT=10

PAYPAL_CLIENT_ID=your-paypal-sandbox-client-id
PAYPAL_APP_SECRET=your-paypal-sandbox-secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
```

`PORT` defaults to `5000` if omitted. Keep the `.env` file private; do not commit real credentials. PayPal credentials and API URL should all belong to the same environment (sandbox or live).

### 3. Load sample data (optional)

With MongoDB running and `MONGO_URI` configured:

```bash
npm run data:import
```

This seeds sample products and users. **Importing data clears the existing users, products, and orders in the configured database.** The seeded accounts use the password `123456`:

| Role | Email |
| --- | --- |
| Admin | `admin@email.com` |
| Customer | `ghostrider@email.com` |
| Customer | `spiderman@email.com` |

These are development-only demo credentials; change or remove them before deploying.

### 4. Start the app

Run both the API and React development server from the repository root:

```bash
npm run dev
```

The storefront is available at [http://localhost:3000](http://localhost:3000). The Express API runs at [http://localhost:5000](http://localhost:5000); the frontend development server proxies API requests to it. You can also start each process separately with `npm run server` and `npm run client`.

## Useful scripts

Run these commands from the repository root unless noted otherwise.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the backend and frontend development servers together |
| `npm run server` | Start the backend with Nodemon |
| `npm run client` | Start the React development server |
| `npm start` | Start the backend with Node |
| `npm run build` | Install dependencies and build the frontend for production |
| `npm run data:import` | Clear and seed the configured database with sample data |
| `npm run data:destroy` | Delete users, products, and orders from the configured database |
| `npm test --prefix frontend` | Run frontend tests |

For production, set `NODE_ENV=production`, configure the environment variables, build the frontend, then run `npm start`. The Express server serves the built frontend from `frontend/build`.

## Application structure

```text
backend/
  config/        MongoDB connection
  controllers/   API request handlers
  data/          Seed users and products
  middleware/    Authentication, async handling, and error handling
  models/        Mongoose schemas
  routes/        REST API routes
  utils/         Pricing, PayPal, and token helpers
frontend/
  src/
    components/  Shared UI and route guards
    screens/     Storefront, account, checkout, and admin pages
    slices/      Redux state and RTK Query API slices
uploads/         Locally uploaded product images
```

## API overview

| Endpoint | Purpose |
| --- | --- |
| `/api/products` | List/search products; admins can create products |
| `/api/products/:id` | Read a product; admins can update or delete it |
| `/api/products/:id/reviews` | Add an authenticated product review |
| `/api/products/top` | Get top-rated products |
| `/api/users` | Register; admins can list users |
| `/api/users/login` | Sign in |
| `/api/users/logout` | Sign out |
| `/api/users/profile` | Read or update the signed-in user's profile |
| `/api/orders` | Create an order; admins can list all orders |
| `/api/orders/myorders` | List the signed-in user's orders |
| `/api/orders/:id/pay` | Verify and record PayPal payment |
| `/api/orders/:id/deliver` | Mark an order delivered (admin) |
| `/api/upload` | Upload a product image |
| `/api/config/paypal` | Get the PayPal client ID for checkout |

Most order and account endpoints require authentication. Product, user, and delivery-management endpoints also enforce admin access where appropriate.
>>>>>>> fc1aad7 (readme added)
