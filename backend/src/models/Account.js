
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // Import User for association if needed

const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    accountType: {
        type: DataTypes.ENUM('Savings', 'Current', 'Investment', 'Loan'),
        defaultValue: 'Savings'
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2), // Better for money
        defaultValue: 0.00
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Define Association (Will move to server or index later, but keeping it simple here)
User.hasOne(Account, { foreignKey: 'userId', as: 'account' });
Account.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Account;
