import Cookies from "js-cookie"

const jsonHeader = { "Content-Type": "application/json" }
const authorHeader = () => {
    return { "Authorization": `Bearer ${Cookies.get('accessToken')}` }
}

export {
    jsonHeader,
    authorHeader
}