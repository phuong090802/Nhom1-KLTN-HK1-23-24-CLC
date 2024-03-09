import API from "../api"

const getDepsNameSv = () => {
    return API.get('departments')
}

export {
    getDepsNameSv
}