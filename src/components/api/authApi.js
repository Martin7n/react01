import authRequests from "./authRequests";

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
        };

        return authRequests(`${baseURL}/signup`, options, "Register");
    },
};

export default authApi;
