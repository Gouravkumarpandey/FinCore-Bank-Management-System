
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, sequelize } = require('./src/config/db');
const errorHandler = require('./src/middleware/error');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/accounts', require('./src/routes/accountRoutes'));
app.use('/api/transactions', require('./src/routes/transactionRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DB and sync models
const startServer = async () => {
    await connectDB();

    // Sync models with database
    // force: false ensures we don't drop tables on restart
    // alter: true updates tables if models satisfy changes (use with caution in prod)
    await sequelize.sync({ force: false, alter: true });
    console.log('Database Synced');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
