// import { createContext, useEffect, useState } from "react";
// import authApi from "../components/api/authApi";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const authInit = async () => {
//             try {
//                 // const storedUser = localStorage.getItem("user_profile");
//                 // // joker: all user details:
//                 // //         {
//                 // //   "id": "e4b2a8d1-7c3f-4a6b-9c8d-1e2f3a4b5c6d",
//                 // //   "email": "user@example.com",
//                 // //   "role": "authenticated",
//                 // //   "created_at": "2026-10-15T12:00:00Z",
//                 // //   "app_metadata": {
//                 // //     "provider": "email"
//                 // //   },
//                 // //   "user_metadata": {}
//                 // // }
//                 //        // if (storedUser && storedToken) {
//                 // //     setUser(JSON.parse(storedUser));
//                 // // }
//                 const storedToken = localStorage.getItem("access_token");
//                 console.log(storedToken);

//                 if (!storedToken) {
//                     setUser(null);
//                     return;
//                 }

//                 const storedUserValidated = await authApi.getUser(storedToken);
//                 console.log(storedUserValidated);
//                 setUser(storedUserValidated);
//                 localStorage.setItem(
//                     "user_profile",
//                     JSON.stringify(storedUserValidated),
//                 );
//             } catch (err) {
//                 console.error("Authentication validation failed:", err);

//                 // setUser(null);
//                 // localStorage.removeItem("access_token");
//                 // localStorage.removeItem("refresh_token");
//                 // localStorage.removeItem("user_profile");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         authInit();
//     }, []);

//     const loginUser = (sessionData) => {
//         const userData = sessionData.user;

//         localStorage.setItem("access_token", sessionData.access_token);
//         localStorage.setItem("refresh_token", sessionData.refresh_token);
//         localStorage.setItem("user_profile", JSON.stringify(userData));

//         setUser(userData);
//     };

//     const logoutUser = () => {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         localStorage.removeItem("user_profile");
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// }

import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore and validate the session when the app starts
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");

                if (!accessToken) {
                    return;
                }

                // Validate the stored access token with Supabase
                const result = await authApi.getUser(accessToken);

                if (!result.success) {
                    throw new Error("Could not validate user");
                }
                const userData = result.data;

                setUser(userData);

                localStorage.setItem("user_profile", JSON.stringify(userData));
            } catch (error) {
                console.error("Authentication initialization failed:", error);

                // If the token is invalid, clear the session.
                // For network errors, ideally preserve it and allow retry.
                if (error.status === 401) {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("user_profile");
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

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
