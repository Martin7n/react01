import session_clear from "../utils/session_clear";
import authApi from "./authApi";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export default async function apiCollectionRequests(
    endpoint,
    method = "GET",
    options = {},
    action = "Request",
) {
    let token = null;

    // check the auth with the backend. If it fails, skiping the Authorization token.
    // Should  works with the refresh token.

    try {
        const storedToken = localStorage.getItem("access_token");
        if (storedToken) {
            const user = await authApi.getUser(storedToken);
            if (!user || user.success === false) {
                throw new Error(
                    user?.message ||
                        "User profile authentication verification rejected.",
                );
            }
            token = user?.token || null;
        }
    } catch (tokenError) {
        session_clear();
        console.log(tokenError);
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    // const token = localStorage.getItem("access_token") || SUPABASE_KEY;
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
        ...options,
        method: method,
        headers: {
            apikey: SUPABASE_KEY,
            // Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
            Prefer: "return=representation",
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(
            `${action} failed, verbously: ${response.status}, ${response.statusText}`,
        );
    }

    const text = await response.text();
    const parsedData = text ? JSON.parse(text) : null;
    return {
        success: true,
        data: parsedData,
    };
}
