
// versatile mock auth service using localStorage
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateAccountNumber = () => {
    return '4582' + Math.floor(100000000000 + Math.random() * 900000000000); // Mock 16 digit number starting with 4582
};

export const authService = {
    async login(email, password) {
        await delay(1000); // Simulate network delay

        // Check against stored users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Create session
        const token = 'mock-jwt-token-' + Date.now();
        const userData = { ...user, token };
        localStorage.setItem('currentUser', JSON.stringify(userData));

        return userData;
    },

    async signup(name, email, password) {
        await delay(1000);

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if user exists
        if (users.find(u => u.email === email)) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            accountNumber: generateAccountNumber(),
            balance: 10000.00, // Sign up bonus
            fincoins: 500,
            accountType: 'Savings'
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after signup
        const token = 'mock-jwt-token-' + Date.now();
        const userData = { ...newUser, token };
        localStorage.setItem('currentUser', JSON.stringify(userData));

        return userData;
    },

    async logout() {
        await delay(500);
        localStorage.removeItem('currentUser');
    },

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        if (!user) return null;

        // Always fetch latest data from 'users' array to ensure balance is up to date
        const parsedUser = JSON.parse(user);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUser = users.find(u => u.email === parsedUser.email) || parsedUser;

        return updatedUser;
    },

    updateCurrentUser(updatedData) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.email === currentUser.email);

        if (index !== -1) {
            users[index] = { ...users[index], ...updatedData };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[index]));
        }
    }
};
