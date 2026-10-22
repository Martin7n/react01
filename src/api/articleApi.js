import apiCollectionRequests from "./apiRequests";

const baseURL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;







const articleApi = {
    getAll(categoryId) {
       
        return apiCollectionRequests(
            `articles?category=eq.${categoryId}`,
            "GET",
            {},
            "Load Categories",
        );
    },
    createOne(formData) {
        return apiCollectionRequests(
            "articles",
            "POST",
            {
                body: JSON.stringify(formData),
            },
            "Create Article",
        );
    },
    editOne(id, formData) {
        return apiCollectionRequests(
            `articles?id=eq.${id}`,
            "PATCH",
            {
                body: JSON.stringify(formData),
            },
            "Update Article",
        );
    },
    deleteOne(id) {
        return apiCollectionRequests(
            `articles?id=eq.${id}`,
            "DELETE",
            {},
            "Delete Article",
        );
    },
};

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtonLFQ9AKmsEhe2MmmGBRTiHK5NzD4aDoTVJRztNnrg&s=10

export default articleApi;
