
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Account = require('./src/models/Account');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected to seed admin...');

        const email = 'pandeygourav2002@gmail.com';
        const password = 'Gourav#710';
        const fullName = 'Gourav Pandey';

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            console.log('User already exists, updating to admin...');
            user.role = 'admin';
            user.password = password; // Will be hashed by pre-save hook
            user.fullName = fullName;
            await user.save();
        } else {
            console.log('Creating new admin user...');
            user = await User.create({
                fullName,
                email,
                password,
                role: 'admin'
            });

            // Create account for admin (optional but good for consistency)
            const accountNumber = '4582' + Math.floor(100000000000 + Math.random() * 900000000000);
            const upiId = fullName.toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900) + '@fincore';

            await Account.create({
                userId: user._id,
                accountNumber,
                upiId,
                accountType: 'savings',
                balance: 1000000 // Admin starting balance
            });
        }

        console.log('Admin user seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

createAdmin();
