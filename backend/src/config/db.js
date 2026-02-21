const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error('👉 Please ensure your IP address is whitelisted in MongoDB Atlas or use a local MongoDB instance.');
        // Don't exit process, allow server to stay up so frontend doesn't get Connection Refused
    }
};

module.exports = { connectDB };
