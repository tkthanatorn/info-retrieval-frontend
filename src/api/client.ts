import axios from "axios"

export const fetchPrivate = (() => {
    const getAuthToken = async () => {
        try {
            const rawToken = localStorage.getItem("token");
            if (!rawToken) {
                throw new Error("Token not found");
            }

            const token = rawToken.slice(1, - 1);
            return "Bearer " + token;
        } catch (err) {
            console.log("getAuthToken", err);
        }
    };

    const instance = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL
    });

    instance.interceptors.request.use(async (config) => {
        config.headers["X-Authorization"] = await getAuthToken();
        return config;
    });

    return instance;
})();

export const fetchPublic = (() => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL
    });

    return instance;
})();