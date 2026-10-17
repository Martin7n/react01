const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const baseURL = `${import.meta.env.VITE_SUPABASE_URL}/auth/v1`;

export default async function authRequests(
    url,
    options = {},
    action = "Request",
) {
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
