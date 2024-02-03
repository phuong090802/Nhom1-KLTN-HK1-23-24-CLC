import API from "../api";
import { jsonHeader } from "../header";

const signUp = (data) => { return API.post('auth/register', data, { headers: jsonHeader }) }

export {
    signUp
}