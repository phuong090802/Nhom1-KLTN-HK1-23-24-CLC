import axios from "axios";

const API = axios.create({
    baseURL: 'https://api-student-consulting.vercel.app/api/'
})

export default API