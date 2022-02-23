import axios from "axios";

const getToken = () => {
    return new Promise(resolve => {
        resolve(`Bearer ${localStorage.getItem("token") || null}`)
    })
}

const api = axios.create({
    baseURL:
    process.env.NODE_ENV === 'production'
    ?"http://localhost:3001/api"
    :"http://localhost:3001/api"
})

api.interceptors.request.use(
    async(config)=>{
        config.headers["Authorization"] = await getToken()
        return config
    },
    (error)=>{
        console.log("Request Error: ", error.message)
        return Promise.reject(error)
    }
)

export default api;