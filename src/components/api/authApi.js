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
};

export default authApi;
