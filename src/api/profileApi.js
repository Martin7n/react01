import apiCollectionRequests from "./apiRequests";

const baseURL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const profileApi = {
    getProfile(userId) {
        return apiCollectionRequests(
            `profiles?id=eq.${userId}&select=*`,
            "GET",
            {},
            "Get Profile",
        );
    },
    updateSubscriptions(userId, subscribedCategoriesArray) {
        const postgresArrayString = `{${subscribedCategoriesArray.join(",")}}`;
        console.log(postgresArrayString);

        return apiCollectionRequests(
            `profiles?id=eq.${userId}`,
            "PATCH",
            {
                body: JSON.stringify({
                    subscribed_categories: postgresArrayString,
                }),
            },
            "Update Subscriptions",
        );
    },
};

export default profileApi;
