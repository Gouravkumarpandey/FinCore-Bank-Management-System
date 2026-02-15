
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'fincore_bank',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false, // Turn off logging
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`PostgreSQL Connected: ${process.env.DB_HOST}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
