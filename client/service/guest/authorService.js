import API from "../api";
import { jsonHeader } from "../header";

const register = API.post('auth/register', data, { headers: jsonHeader })

export {
    register
}