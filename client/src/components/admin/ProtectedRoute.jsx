import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
    const { admin, loading } = useAuth();

    if (loading) return null; // Or a spinner

    if (!admin) {
        return <Navigate to={import.meta.env.VITE_ADMIN_LOGIN} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
