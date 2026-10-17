const SUPABASE_KEY = "";
const baseURL = `${SUPABASE_URL}/auth/v1`;

async function authRequest(url, options = {}, action = "Request") {
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Prefer: "return=representation",
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(
            `${action} failed: ${response.status} ${response.statusText}`,
        );
    }

    const text = await response.text();

    return {
        success: true,
        data: text ? JSON.parse(text) : null,
    };
}

const authApi = {
    async login(formData) {
        const options = {
            method: "POST",
            body: JSON.stringify(formData),
        };

        return authRequest(
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

        return authRequest(`${baseURL}/signup`, options, "Register");
    },
};

export default authApi;
