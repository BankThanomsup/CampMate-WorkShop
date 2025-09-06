import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    console.error("VITE_API_URL environment variable is not set");
}

export const getStats =async (token )=>{

    return await axios.get(`${API_URL}/api/stats`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}

export const listStats = async (token)=>{

    return await axios.get(`${API_URL}/api/stats`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}
export const listReservations = async (token)=>{

    // return await axios.get(`http://localhost:5000/api/reservations`,{
        
    return await axios.get(`${API_URL}/api/reservations`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}
export const listAllReservations  = async (token)=>{

    // return await axios.get(`http://localhost:5000/api/all-reservations`,{

    return await axios.get(`${API_URL}/api/all-reservations`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}
export const listMyCampings  = async (token)=>{

    // return await axios.get(`http://localhost:5000/api/my-campings`,{

    return await axios.get(`${API_URL}/api/my-campings`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}

export const listUserReservationStats = async (token)=>{

    return await axios.get(`${API_URL}/api/user-reservation-stats`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}

export const listUserReservations = async (token)=>{

    return await axios.get(`${API_URL}/api/user-reservations`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}