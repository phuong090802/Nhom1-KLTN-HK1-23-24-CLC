import API from "../api"

const getNewsSv = (params) => {
    return API.get("news",{
        params: params
    })
}
export {getNewsSv}

