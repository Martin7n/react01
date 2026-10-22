import session_clear from "../utils/session_clear";
import authRequests from "./authRequests";

const baseURL = `${import.meta.env.VITE_SUPABASE_URL}/auth/v1`;

const authApi = {
    async login(formData) {
        const options = {
            method: "POST",
            body: JSON.stringify(formData),
        };

        return authRequests(
            `${baseURL}/token?grant_type=password`,
            options,
            "Register",
        );
    },

    async register(formData) {
        const options = {
            method: "POST",
            body: JSON.stringify(formData),
            Prefer: "return=representation",
        };

        return authRequests(`${baseURL}/signup`, options, "Register");
    },

    async getUser(accessToken) {
        const requestUser = (token) =>
            authRequests(
                `${baseURL}/user`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
                "Get user",
            );

        try {
            return await requestUser(accessToken);
        } catch (error) {
            const expired =
                error.code === "PGRST303" || /JWT expired/i.test(error.message);

            // If the error isn't due to an expired token, clear tokens and bail out
            if (!expired) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                throw error;
            }

            const refreshToken = localStorage.getItem("refresh_token");

            // CRITICAL CLEANUP: No refresh token exists to save the session, wipe everything
            if (!refreshToken) {
                session_clear();
                throw new Error("Session expired. No refresh token available.");
            }

            try {
                // Attempt to request a new session pair from Supabase auth endpoints
                const refreshed = await authApi.refreshSession(refreshToken);

                const newAccessToken = refreshed.data.access_token;
                const newRefreshToken = refreshed.data.refresh_token;

                localStorage.setItem("access_token", newAccessToken);
                localStorage.setItem("refresh_token", newRefreshToken);

                return await requestUser(newAccessToken);
            } catch (refreshError) {
                session_clear();
                throw new Error(
                    "Session expired. Failed to refresh authentication token.",
                );
            }
        }
    },
};

export default authApi;
