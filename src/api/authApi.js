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
    // async getUser(accessToken) {
    //     const options = {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${accessToken}` },
    //     };

    //     return authRequests(`${baseURL}/user`, options, "Get user");
    // },

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

            if (!expired) {
                throw error;
            }

            const refreshToken = localStorage.getItem("refresh_token");

            if (!refreshToken) {
                throw error;
            }

            const refreshed = await authApi.refreshSession(refreshToken);

            const newAccessToken = refreshed.data.access_token;
            const newRefreshToken = refreshed.data.refresh_token;

            // Save the renewed session.
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("refresh_token", newRefreshToken);

            return requestUser(newAccessToken);
        }
    },
};

export default authApi;
