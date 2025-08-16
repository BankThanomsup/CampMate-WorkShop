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