import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    console.error("VITE_API_URL environment variable is not set");
}

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

export const updateCamping = async (token, id, data) => {
    return await axios.put(`${API_URL}/api/camping/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteCamping = async (token, id) => {
    return await axios.delete(`${API_URL}/api/camping/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// ดึงข้อมูล bookings ของ camping site ที่ระบุ (ทุกคน)
export const getCampingBookings = async (campingId) => {
    return await axios.get(`${API_URL}/api/camping/${campingId}/bookings`)
}

// ดึงข้อมูล bookings ของ user ปัจจุบันสำหรับ camping site ที่ระบุ
export const getUserCampingBookings = async (token, campingId) => {
    return await axios.get(`${API_URL}/api/camping/${campingId}/user-bookings`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
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