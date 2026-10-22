import { Navigate } from "react-router";
import { useAuth } from "../../context/authContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <p className="text-center mt-24 text-gray-400">
                Verifying access credentials...
            </p>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
