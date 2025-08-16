import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    console.error("VITE_API_URL environment variable is not set");
}

export const uploadFileImage =async (token , form)=>{

    return await axios.post(`${API_URL}/api/images`,{image: form },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })  
}

