import apiCollectionRequests from "./apiRequests";

const baseURL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const categoryApi = {
    getAllCount() {
        return apiCollectionRequests(
            "techs?select=*,articles(count=exact)",
            "GET",
            {},
            "Categories with count",
        );
    },
    getAll() {
        return apiCollectionRequests(
            "techs?select=*",
            "GET",
            {},
            "Load Categories",
        );
    },
    getOne(id) {
        return apiCollectionRequests(
            `techs?id=eq.${id}`,
            "GET",
            "Get CategoryItem",
        );
    },
    subsOne(id, userId) {},
    delSubsOne(id, userId) {},
    createOne(formData) {
        return apiCollectionRequests(
            "techs",
            "POST",
            {
                body: JSON.stringify(formData),
            },
            "Create Category",
        );
    },
    editOne(id, formData) {
        return apiCollectionRequests(
            `techs?id=eq.${id}`,
            "PATCH",
            {
                body: JSON.stringify(formData),
            },
            "Edit Category",
        );
    },
    deleteOne(params) {},
};

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtonLFQ9AKmsEhe2MmmGBRTiHK5NzD4aDoTVJRztNnrg&s=10

export default categoryApi;
