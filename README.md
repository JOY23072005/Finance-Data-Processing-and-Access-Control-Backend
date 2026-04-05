# 💰 Finance Dashboard Backend (Assignment)

## 🚀 Overview

This project is a backend system for a **finance dashboard application** that allows users to manage financial records with proper **role-based access control (RBAC)** and view **aggregated insights**.

The system is designed to demonstrate backend engineering skills including:

* API design
* Data modeling
* Access control
* Business logic implementation
* Database handling
* Clean architecture

---

## 🧠 Tech Stack

* **Node.js + Express (TypeScript)**
* **PostgreSQL (Supabase)**
* **JWT Authentication**
* **pg (node-postgres)**

---

## 🏗️ Architecture

```
Controller → Service → Database
```

* **Controllers** → Handle request/response
* **Services** → Business logic & SQL queries
* **Middleware** → Authentication & RBAC

---

## 🔐 Authentication & Authorization

### 🔑 JWT Authentication

* Users authenticate via `/api/auth/login`
* JWT token is required for protected routes

### 🛡️ Role-Based Access Control (RBAC)

| Role    | Permissions                              |
| ------- | ---------------------------------------- |
| Viewer  | View dashboard only                      |
| Analyst | View records + dashboard                 |
| Admin   | Full access (users, records, categories) |

---

## 👤 User Management

### Features

* Create users (Admin)
* Assign roles
* Activate / deactivate users
* Fetch users

### Endpoints

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | `/api/users`            |
| GET    | `/api/users`            |
| GET    | `/api/users/:id`        |
| PATCH  | `/api/users/:id/role`   |
| PATCH  | `/api/users/:id/status` |

---

## 🏷️ Categories Module

Used for normalization and analytics.

### Features

* Create categories (Admin)
* Fetch categories
* Update categories
* Prevent deletion if in use

### Endpoints

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | `/api/categories`     |
| GET    | `/api/categories`     |
| PATCH  | `/api/categories/:id` |
| DELETE | `/api/categories/:id` |

---

## 💰 Financial Records

### Features

* Create records (Admin)
* Update records (partial updates supported)
* Soft delete records
* Filter records by:

  * type
  * category
  * date range

### Endpoints

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/records`     |
| GET    | `/api/records`     |
| PATCH  | `/api/records/:id` |
| DELETE | `/api/records/:id` |

---

## 📊 Dashboard APIs (Core Feature)

### 🔥 Summary

* Total income
* Total expense
* Net balance

```
GET /api/dashboard/summary
```

---

### 📂 Category Breakdown

```
GET /api/dashboard/categories
```

---

### 📈 Monthly Trends

```
GET /api/dashboard/trends
```

---

### 🕒 Recent Activity

```
GET /api/dashboard/recent
```

---

## 🧩 Data Modeling

### Tables:

* users
* records
* categories

### Key Design Decisions:

* `category_id` used instead of raw strings (normalization)
* `created_by` & `updated_by` for audit tracking
* Soft delete using `deleted_at`

---

## 🔐 Access Control Logic

* Middleware-based RBAC
* JWT-based authentication
* Admin-only operations enforced at route level

---

## ⚠️ Validation & Error Handling

* Input validation for required fields
* Proper HTTP status codes:

  * 200 → Success
  * 201 → Created
  * 400 → Bad request
  * 401 → Unauthorized
  * 403 → Forbidden
  * 404 → Not found
* Prevent invalid operations:

  * Invalid role updates
  * Deleting used categories
  * Updating non-existent records

---

## 🗄️ Data Persistence

* PostgreSQL used for structured financial data
* Hosted on Supabase (free tier)

> Note: Free tier projects may pause after inactivity (~7 days)

---

## 🧪 API Testing

All APIs are tested using **Postman**

👉 Postman collection included in repo

---

## ⚙️ Setup Instructions

```bash
git clone <repo-url>
cd project
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` file:

```
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
```

---

## 📌 Assumptions

* No advanced authentication (e.g., OAuth)
* Roles are managed internally
* Categories are pre-seeded or created by admin
* Single-tenant system

---

## 🚀 Future Improvements

* Pagination
* Advanced filtering
* Caching
* Unit tests
* Rate limiting

---

## 🎯 Conclusion

This project demonstrates:

* Clean backend architecture
* Strong data modeling
* Role-based access control
* Aggregation queries for analytics

The focus was on building a **clear, maintainable, and logically structured backend system** rather than unnecessary complexity.
