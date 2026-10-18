const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export default async function apiCollectionRequests(
    endpoint,
    method = "GET",
    options = {},
    action = "Request",
) {
    const token = localStorage.getItem("access_token") || SUPABASE_KEY;
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
        ...options,
        method: method,
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${token}`,
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
