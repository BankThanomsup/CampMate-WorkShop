import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const createCamping =async (token , data)=>{

    return await axios.post(`${API_URL}/api/camping`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })  
}

export const listCamping = async (id) => {
    return await axios.get(`${API_URL}/api/campings/${id}`)}

export const readCamping = async (id) => {
    return await axios.get(`${API_URL}/api/camping/${id}`)
}




export const addorRemoveFavoriteCamping =async (token , data)=>{

    return await axios.post(`${API_URL}/api/favorite`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })  
}

export const listFavorites =(token)=>{

    return  axios.get(`${API_URL}/api/favorites`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })  
}

//Filter
export const filterCamping =(category,search)=>{
    return  axios.get(`${API_URL}/api/filter-camping?category=${category}&search=${search}`)  
}