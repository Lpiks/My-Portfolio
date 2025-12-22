import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, admin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (admin) {
            navigate('/admin');
        }
    }, [admin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-secondary border border-glass-border p-8 rounded-2xl shadow-2xl"
            >
                <h2 className="text-3xl font-bold font-heading text-center mb-8">Admin Access</h2>
                {error && <div className="bg-red-500/20 text-red-500 p-3 rounded mb-4 text-center text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full bg-primary/50 border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors text-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-primary/50 border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
                        Login
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
