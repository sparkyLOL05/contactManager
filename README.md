# Secure Backend Contact Manager API

A production-ready, standalone RESTful API built using Node.js, Express, and MongoDB. The architecture features robust user authentication via stateless JSON Web Tokens (JWT) and industry-standard password encryption utilizing `bcrypt`. The system leverages defensive, router-level middleware validation to enforce strict data isolation—ensuring every authenticated user securely manages only their own isolated contact pool.

## 🚀 Live Links
- **GitHub Repository:** https://github.com/sparkyLOL05/contactManager
- **Live API Endpoint:** https://contactmanager-gnt6.onrender.com

---

## 🛠️ Tech Stack & Architecture
- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js
- **Database Engine:** MongoDB Atlas (Cloud Managed Cluster)
- **Object Data Modeling (ODM):** Mongoose
- **Security Protocols:** JSON Web Tokens (JWT), Bcrypt Hashing, Custom Middleware Guardrails

---

## 🔒 Key Engineering Features

- **Global Route Guarding:** Implemented centralized, router-level middleware (`router.use(validateToken)`) across contact resources to intercept incoming HTTP requests and verify authorization tokens defensively.
- **Stateless Authorization:** Engineered JWT token generation upon successful login to handle secure session parsing via the `Authorization: Bearer <token>` header interface.
- **Cryptographic Hashing:** Employed `bcrypt` salting and hashing mechanics to encrypt user passwords prior to database persistence, mitigating credential exposure risks.
- **Architectural Separation of Concerns:** Organized the code footprint cleanly by dividing endpoint trees (`/routes`) from operational business layers (`/controllers`), adhering closely to the Single Responsibility Principle (SRP).

---

## 🚦 API Reference

### 🔐 User Authentication & Profile
**Base Path:** `/api/users`

| Method | Endpoint | Access | Description | Middleware |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/register` | Public | Registers a new user account and hashes the password. | None |
| **POST** | `/login` | Public | Validates user credentials and issues a signed JWT token. | None |
| **GET** | `/current` | Protected | Extracts profile data for the currently authenticated user. | `validateToken` |

### 📇 Contact Management (CRUD Operations)
**Base Path:** `/api/contacts`

> ⚠️ **Security Requirement:** Every endpoint within this resource space is globally bound by authentication middleware. Unauthorized HTTP requests lacking a valid header will be dropped immediately by custom error boundaries.

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Protected | Fetches all contact documents owned explicitly by the active user. |
| **POST** | `/` | Protected | Commits a new contact entry into the cluster database. |
| **GET** | `/:id` | Protected | Resolves details for a specific unique contact tracking ID. |
| **PUT** | `/:id` | Protected | Modifies properties of a pre-existing, isolated contact document. |
| **DELETE**| `/:id` | Protected | Permanently purges a specific contact record from the collection. |

---

## 💻 Local Installation & Setup

Follow these steps to spin up the REST API within your local development environment:

### 1. Clone the Codebase
```bash
git clone https://github.com/sparkyLOL05/contactManager
cd contactManagerProject



### 2. Install Package Dependencies
npm install



###3. Establish Environment Variables
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/YourDatabaseName?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_random_jwt_string

(Make sure to replace the placeholder fields with your active MongoDB Atlas credentials).



###4. Fire Up the Server Process
node index.js

---

## 📄 License
This project is licensed under the ISC License.



