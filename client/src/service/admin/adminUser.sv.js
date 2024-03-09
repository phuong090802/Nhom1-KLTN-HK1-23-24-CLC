import API from "../api"
import { authorHeader } from "../header"

const getUsersSv = (params) => {
    return API.get('admin/users', {
        headers: authorHeader(),
        params: params
    })
}

const addUserSv = (data) => {
    return API.post('admin/staffs', data, {
        headers: authorHeader(),
    })
}

export {
    getUsersSv,
    addUserSv
}