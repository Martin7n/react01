import apiCollectionRequests from "./apiRequests";

const baseURL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const categoryApi = {
    getAll() {
        return apiCollectionRequests(
            "techs?select=*",
            "GET",
            {},
            "Load Categories",
        );
    },
    getOne(params) {},
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
    editOne(params) {},
    deleteOne(params) {},
};

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtonLFQ9AKmsEhe2MmmGBRTiHK5NzD4aDoTVJRztNnrg&s=10

export default categoryApi;
