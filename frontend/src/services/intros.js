import api from "./apiConfig";

export const getUsers = async () => {
    try {
        const res = await api.get("/dashboard")
        return res
    } catch (e) {   
        throw e;     
    }
}

export const getIntro = async (id) => {
    try{
    const res = await api.get(`/dashboard/intros/${id}`)
    return res.data;
    }catch(e){
        throw e;
    }
}

export const makeIntro = async (input) => {
    try {
        const res = await api.post("/dashboard/intro", input)
        return res.data;
    } catch (e) {
        throw e;        
    }
}

export const updateIntro = async(id, input) => {
    try {
        const res = await api.put(`/dashboard/intros/${id}`, input)
        return res.data;          
    } catch (e) {
        throw e;
    }
}

export const deleteIntro = async(id) => {
    try {
        const res = await api.delete(`/dashboard/intros/${id}`)
        console.log(res)
        return res.data
    } catch (e) {
        throw e;      
    }
}