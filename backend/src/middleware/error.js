
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Log to console for dev
    console.log(err);

    // Initializing customError with the original fallback
    let customError = error;

    // Sequelize unique constraint error
    if (err.name === 'SequelizeUniqueConstraintError') {
        const message = err.errors.map(e => e.message).join(', ');
        customError = new ErrorResponse(message, 400);
    }

    // Sequelize validation error
    if (err.name === 'SequelizeValidationError') {
        const message = err.errors.map(e => e.message).join(', ');
        customError = new ErrorResponse(message, 400);
    }

    // Sequelize database error
    if (err.name === 'SequelizeDatabaseError') {
        const message = 'Database Error';
        customError = new ErrorResponse(message, 500);
    }

    res.status(customError.statusCode || 500).json({
        success: false,
        error: customError.message || 'Server Error'
    });
};

module.exports = errorHandler;
