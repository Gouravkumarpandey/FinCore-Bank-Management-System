
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

// Inactivity timeout in milliseconds (e.g., 15 minutes)
const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const logoutTimerRef = useRef(null);

    const logout = async () => {
        await authService.logout();
        setUser(null);
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };

    const resetInactivityTimer = () => {
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        if (user) {
            logoutTimerRef.current = setTimeout(() => {
                console.log("User inactive, logging out...");
                logout();
                alert("You have been logged out due to inactivity.");
            }, INACTIVITY_TIMEOUT);
        }
    };

    useEffect(() => {
        // Check for logged in user on mount
        const checkUser = async () => {
            try {
                const currentUser = authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    // Setup inactivity listeners whenever user state changes
    useEffect(() => {
        if (!user) return;

        resetInactivityTimer();

        const handleActivity = () => resetInactivityTimer();

        // Listen for user interactions
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keypress', handleActivity);
        window.addEventListener('click', handleActivity);
        window.addEventListener('scroll', handleActivity);

        return () => {
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keypress', handleActivity);
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('scroll', handleActivity);
        };
    }, [user]);

    const login = async (email, password) => {
        const userData = await authService.login(email, password);
        setUser(userData);
        return userData;
    };

    const signup = async (name, email, password) => {
        const userData = await authService.signup(name, email, password);
        setUser(userData);
        return userData;
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
