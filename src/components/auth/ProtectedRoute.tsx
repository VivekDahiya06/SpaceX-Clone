import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = !!localStorage.getItem('user');
    const isAuthorized = document.cookie.includes('session=active');
    const validUser = isAuthenticated && isAuthorized;
    return validUser ? <>{children}</> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
