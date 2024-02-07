import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

API.interceptors.response.use((response) => {
    return response.data
})

export default API