import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import session_clear from "../utils/session_clear";
import { useLocation } from "react-router";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Restore and validate the session when the app starts
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");

                if (!accessToken) {
                    return;
                }

                const result = await authApi.getUser(accessToken);

                if (!result.success) {
                    setUser(null);

                    throw new Error("Could not validate user");
                }
                const userData = result.data;

                setUser(userData);

                localStorage.setItem("user_profile", JSON.stringify(userData));
            } catch (error) {
                console.error("Authentication initialization failed:", error);
                session_clear();
                setUser(null);

                // If the token is invalid, clear the session.
                // For network errors, ideally preserve it and allow retry.
                // if (error.status === 401)
                // if (error.status) {
                //     localStorage.removeItem("access_token");
                //     localStorage.removeItem("refresh_token");
                //     localStorage.removeItem("user_profile");
                //     setUser(null);
                // }
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, [location.pathname]);

    // Save the session after successful login
    const loginUser = (sessionData) => {
        const userData = sessionData.user;

        localStorage.setItem("access_token", sessionData.access_token);
        localStorage.setItem("refresh_token", sessionData.refresh_token);
        localStorage.setItem("user_profile", JSON.stringify(userData));

        setUser(userData);
    };

    const logoutUser = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_profile");

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
