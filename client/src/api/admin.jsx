import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const listStats = async (token)=>{

    return await axios.get(`${API_URL}/api/stats`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}