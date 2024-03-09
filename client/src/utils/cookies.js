import Cookies from "js-cookie"
import { json } from "react-router";

const getUserData = () => {
    if (Cookies.get('userData')) {
        return JSON.parse(atob(Cookies.get('userData')))
    } else {
        return null
    }
}

export {
    getUserData
}