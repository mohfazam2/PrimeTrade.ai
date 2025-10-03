# 🚀 PrimeTrade.AI – Backend Assignment

A scalable REST API with authentication, role-based access, and CRUD operations for products.  
This project was built as part of the **Backend Developer (Intern) Assignment**.

---

## 📌 Features

### ✅ Authentication & Authorization
- User **Signup & Login** APIs
- Password hashing with **bcrypt**
- **JWT-based authentication**
- **Role-based access** (Admin vs User)

### ✅ Products Module
- **Add Product** (Admin only)
- **Fetch All Products**
- **Update & Delete Products** (Admin only)
- Product health check routes

### ✅ Other
- API versioning (`/api/v1`)
- Input validation with **Zod**
- Centralized error handling
- Health routes for monitoring

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JWT + bcrypt
- **Validation:** Zod
- **Hosting:** Vercel (Serverless)

## 📂 Project Structure

src
|-- Routes # API route handlers
|-- Middleware # Auth & validation middlewares
|-- Schemas # Zod validation schemas
|-- Controllers # Core business logic
|-- prisma/ # Database schema & migrations
`-- index.ts # Entry point

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/prime-trade-ai.git
cd prime-trade-ai
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env file in the root:

env
Copy code
DATABASE_URL=postgresql://user:password@localhost:5432/primetrade
JWT_SECRET=your_jwt_secret
4. Run Database Migrations
bash
Copy code
npx prisma migrate dev
5. Start the Server
bash
Copy code
npm run dev
By default the API runs at:
http://localhost:3000/api/v1

📖 API Documentation
🟢 Postman Collection
All API endpoints are documented in the Postman Collection.

Import the collection file: postman/assignment_collection.json

Or access via live Postman link: PrimeTrade.AI Postman Docs

Example Endpoints
🔹 Auth
POST /api/v1/auth/signup → Register new user

POST /api/v1/auth/login → Login and get JWT

🔹 Products
POST /api/v1/products/add → Add new product (Admin only)

GET /api/v1/products/all → Fetch all products

PUT /api/v1/products/:id → Update product (Admin only)

DELETE /api/v1/products/:id → Delete product (Admin only)

🔹 Health
GET /health → Root health check

GET /api/v1/health → API health check

GET /api/v1/auth/health → Auth module health

GET /api/v1/products/health → Products module health

🔐 Security Practices
Passwords stored with bcrypt hashing

JWT expiration (12 hours)

Input sanitization & validation using Zod

Role-based access middleware

📈 Scalability Note
Modular architecture for adding new modules easily

Database handled with Prisma ORM → allows migration to MySQL, Postgres, or MongoDB

JWT auth can be extended with refresh tokens

For production scale:

Caching layer (Redis) for product fetches

Logging (Winston / ELK stack)

Dockerized deployment

Microservices split: auth, products, gateway

🎯 Evaluation Checklist
 User registration & login with JWT ✅

 Role-based access ✅

 CRUD APIs for Products ✅

 API versioning & validation ✅

 API documentation (Postman) ✅

 Database schema (Prisma + Postgres) ✅

 Frontend (React Dashboard) ✅

 Scalability note ✅

