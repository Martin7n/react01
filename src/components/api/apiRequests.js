const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;


export default async function apiCollectionRequests(
    endpoint,
    options = {},
    action = "Request"
){

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${endpoint}`,
        {
          ...options,
          headers:{
            apikey: SUPABASE_KEY,
            "Content-type": "application-json",
            Prefer: "return=representation",
            ...options.headers,
          },      
        }
    );

    if (!response.ok) {
        throw new Error(`${action} failed, verbously: ${response.status}, ${response.statusText}`)
    }

    const text = await response.text();

    return text ? JSON.parse(text) : null;



};