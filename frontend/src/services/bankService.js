
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const bankService = {
    getTransactions(userEmail) {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        return transactions.filter(t => t.userEmail === userEmail || t.recipientEmail === userEmail).reverse();
    },

    async deposit(userEmail, amount) {
        await delay(800);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === userEmail);

        if (userIndex === -1) throw new Error('User not found');

        const newBalance = parseFloat(users[userIndex].balance) + parseFloat(amount);
        users[userIndex].balance = newBalance;

        // Record Transaction
        const transaction = {
            id: Date.now(),
            userEmail,
            type: 'Deposit',
            amount: parseFloat(amount),
            date: new Date().toISOString(),
            status: 'Completed',
            description: 'Cash Deposit'
        };

        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        transactions.push(transaction);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('transactions', JSON.stringify(transactions));

        return { balance: newBalance, transaction };
    },

    async withdraw(userEmail, amount) {
        await delay(800);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === userEmail);

        if (userIndex === -1) throw new Error('User not found');

        if (users[userIndex].balance < amount) {
            throw new Error('Insufficient funds');
        }

        const newBalance = parseFloat(users[userIndex].balance) - parseFloat(amount);
        users[userIndex].balance = newBalance;

        const transaction = {
            id: Date.now(),
            userEmail,
            type: 'Withdrawal',
            amount: parseFloat(amount),
            date: new Date().toISOString(),
            status: 'Completed',
            description: 'ATM Withdrawal'
        };

        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        transactions.push(transaction);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('transactions', JSON.stringify(transactions));

        return { balance: newBalance, transaction };
    },

    async transfer(senderEmail, recipientIdentifier, amount, note) {
        await delay(1000);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const senderIndex = users.findIndex(u => u.email === senderEmail);

        if (senderIndex === -1) throw new Error('Sender not found');

        // Identify recipient (by email or account number)
        const recipientIndex = users.findIndex(u =>
            u.email === recipientIdentifier || u.accountNumber === recipientIdentifier
        );

        if (recipientIndex === -1) throw new Error('Recipient not found');
        if (senderIndex === recipientIndex) throw new Error('Cannot transfer to yourself');

        if (users[senderIndex].balance < amount) {
            throw new Error('Insufficient funds');
        }

        // Deduct from sender
        users[senderIndex].balance = parseFloat(users[senderIndex].balance) - parseFloat(amount);

        // Add to recipient
        users[recipientIndex].balance = parseFloat(users[recipientIndex].balance) + parseFloat(amount);

        // Record Transactions (One for sender, one for viewability?) 
        // Actually, we can just store one transaction record with both emails, but for simplicity in "getTransactions", let's make it clear.

        const transactionId = Date.now();
        const transaction = {
            id: transactionId,
            userEmail: senderEmail,
            recipientEmail: users[recipientIndex].email,
            recipientName: users[recipientIndex].name,
            senderName: users[senderIndex].name,
            type: 'Transfer',
            amount: parseFloat(amount),
            date: new Date().toISOString(),
            status: 'Completed',
            description: note || `Transfer to ${users[recipientIndex].name}`
        };

        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        transactions.push(transaction);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('transactions', JSON.stringify(transactions));

        return { startBalance: users[senderIndex].balance, transaction };
    }
};
