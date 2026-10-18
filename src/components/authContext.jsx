import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user_profile");
        // joker: all user details:
        //         {
        //   "id": "e4b2a8d1-7c3f-4a6b-9c8d-1e2f3a4b5c6d",
        //   "email": "user@example.com",
        //   "role": "authenticated",
        //   "created_at": "2026-10-15T12:00:00Z",
        //   "app_metadata": {
        //     "provider": "email"
        //   },
        //   "user_metadata": {}
        // }
        const storedToken = localStorage.getItem("access_token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

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
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
