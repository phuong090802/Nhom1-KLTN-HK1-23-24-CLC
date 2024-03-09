import { data } from "autoprefixer"
import API from "../api"
import { authorHeader } from "../header"

const getDepartmentsSv = (params) => {
    return API.get('admin/departments', {
        headers: authorHeader(),
        params: params
    })
}

const addDepartmentSv = (data) => {
    return API.post('admin/departments', data, {
        headers: authorHeader()
    })
}

const updateDepartmentSv = (id, data) => {
    return API.put(`admin/departments/${id}`, data, {
        headers: authorHeader()
    })
}

const updateDepStatusSv = (id, data) => {
    return API.put(`admin/departments/${id}/status`, data, {
        headers: authorHeader()
    })
}

const setDepHeadSv = (data) =>{ 
    return API.put('admin/departments', data,{
        headers: authorHeader()
    })
}

const getDepStaffsSv = (depId, params) => {
    return API.get(`admin/departments/${depId}/counsellors`, {
        headers: authorHeader(),
        params: params
    })
}

export {
    getDepartmentsSv,
    addDepartmentSv,
    updateDepartmentSv,
    updateDepStatusSv,
    getDepStaffsSv,
    setDepHeadSv
}