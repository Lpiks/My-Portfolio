import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                // We're using cookies, so we just check /profile or rely on persistence check?
                // Actually, if we refresh, we need to re-fetch profile if cookie exists.
                // Or simplified: check localStorage if we store user info there, but token is httpOnly.
                // We should hit an endpoint to validate session.
                const { data } = await api.get('/api/auth/profile');
                setAdmin(data);
            } catch (err) {
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (username, password) => {
        const { data } = await api.post('/api/auth/login', { username, password });
        setAdmin(data);
        return data;
    };

    const logout = async () => {
        await api.post('/api/auth/logout');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
