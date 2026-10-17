import apiCollectionRequests from "./apiRequests";

const baseURL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const workoutsApi = {
    getAll() {
        return apiCollectionRequests("workouts?select=*", {}, "Load workouts");
    },
    getOne(params) {},
    editOne(params) {},
    deleteOne(params) {},
};

export default workoutsApi;
