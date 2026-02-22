# 🏦 FinCore - Advanced Bank Management System

<img width="1895" height="910" alt="image" src="https://github.com/user-attachments/assets/dea3f169-5aa9-4eab-be03-8f3b901b9fd8" />



FinCore is a robust, full-stack banking application designed to simulate modern core banking operations. Built with a focus on security, performance, and user experience, it features a sleek dark-themed UI and a powerful backend capable of handling real-time transactions with ACID compliance.

## 🚀 Key Features

### 🔐 Authentication & Security
*   **Secure Sign Up & Login**: JWT-based authentication with encrypted passwords (bcrypt).
*   **Auto-Logout**: Automatic session termination after 15 minutes of inactivity for enhanced security.
*   **Role-Based Access**: Distinct flows for Users and Administrators.

### 💸 Core Banking Operations
*   **Dashboard**: Real-time overview of Account Balance, Account Number, and Status.
*   **Quick Transfers**: Send money instantly to other users via Email or Account ID.
*   **Deposits & Withdrawals**: Simulate cash deposits and withdrawals with immediate balance updates.
*   **Transaction History**: Detailed logs of all financial activities with search and filter capabilities (Income/Expense).

### 👤 User Experience
*   **Profile Management**: View and edit personal details.
*   **Multi-Account View**: Manage Savings, Investment, and Loan accounts from a single interface.
*   **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
*   **Modern UI**: Aesthetic Dark Mode with neon accents for a premium feel.

---

## 🛠️ Tech Stack

### Frontend
*   **React.js (Vite)**: Fast and modular component-based UI.
*   **TailwindCSS**: Utility-first styling for rapid, responsive design.
*   **Lucide React**: Modern, lightweight iconography.
*   **Axios**: For seamless API communication.

### Backend
*   **Node.js & Express**: High-performance REST API.
*   **PostgreSQL**: Relational database for structured financial data.
*   **Sequelize ORM**: For database modeling and querying.
*   **ACID Transactions**: Ensures data integrity during fund transfers (Atomicity).

---

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v14+)
*   PostgreSQL installed and running
*   npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fincore-bank.git
cd FinCore-Bank-Management-System
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies.
```bash
cd backend
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the `backend` directory (use `.env.example` as reference):
```env
PORT=5000
DB_NAME=fincore_bank
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
JWT_SECRET=your_super_secret_key
```

**Setup Database:**
Create the database in your Postgres terminal:
```sql
CREATE DATABASE fincore_bank;
```

**Run Backend:**
```bash
npm run dev
# Server will start on port 5000 and automatically sync tables.
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies.
```bash
cd frontend
npm install
```

**Run Frontend:**
```bash
npm run dev
```
Access the application at `http://localhost:5173`.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | | |
| POST | `/api/auth/register` | Register a new user & create account |
| POST | `/api/auth/login` | Login user & return JWT |
| GET | `/api/auth/me` | Get current user details |
| **Transactions** | | |
| GET | `/api/transactions` | Get transaction history |
| POST | `/api/transactions/transfer` | Transfer funds to another account |
| POST | `/api/transactions/deposit` | Deposit funds |
| POST | `/api/transactions/withdraw` | Withdraw funds |
| **Accounts** | | |
| GET | `/api/accounts` | Get user account details |

---

## 📸 Screenshots

*(Add screenshots of Dashboard, Login, and Transfer pages here)*

---

## 🔮 Future Enhancements
*   [ ] Integration with real Payment Gateways (Stripe/Razorpay).
*   [ ] PDF Statement Generation.
*   [ ] Admin Panel for User Management (Freeze/Unfreeze accounts).
*   [ ] Two-Factor Authentication (2FA).

---

## 👨‍💻 Author
Built with ❤️ by the **FinCore Team**.
