
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Account = require('./src/models/Account');

dotenv.config();

const fixExistingAccounts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected to fix accounts...');

        const accounts = await Account.find({ cardNumber: { $exists: false } });
        console.log(`Found ${accounts.length} accounts without cards.`);

        for (const account of accounts) {
            const cardNumber = '4582' + Math.floor(100000000000 + Math.random() * 900000000000);
            const cardCvv = Math.floor(100 + Math.random() * 900).toString();
            const now = new Date();
            const cardExpiry = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${(now.getFullYear() + 5).toString().slice(-2)}`;

            account.cardNumber = cardNumber;
            account.cardCvv = cardCvv;
            account.cardExpiry = cardExpiry;
            account.cardTheme = 'default';
            // We'll need to fetch user for fullname if missing, but let's just use a placeholder if needed
            // Actually let's fetch user
            const User = require('./src/models/User');
            const user = await User.findById(account.userId);
            account.cardHolderName = user ? user.fullName : 'Valued Customer';

            await account.save();
            console.log(`Fixed account: ${account.accountNumber}`);
        }

        console.log('All accounts updated successfully!');
        process.exit();
    } catch (error) {
        console.error('Error fixing accounts:', error);
        process.exit(1);
    }
};

fixExistingAccounts();
