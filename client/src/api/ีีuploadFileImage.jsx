import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const uploadFileImage =async (token , form)=>{

    return await axios.post(`${API_URL}/api/images`,{image: form },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })  
}

