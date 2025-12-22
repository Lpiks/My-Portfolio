import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

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
                const { data } = await axios.get('http://localhost:5000/api/auth/profile'); // TODO: Use env var
                setAdmin(data);
            } catch (err) {
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };
        // Setup axios defaults
        axios.defaults.withCredentials = true;
        checkLoggedIn();
    }, []);

    const login = async (username, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        setAdmin(data);
        return data;
    };

    const logout = async () => {
        await axios.post('http://localhost:5000/api/auth/logout');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
