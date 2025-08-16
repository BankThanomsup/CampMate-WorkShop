import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    console.error("VITE_API_URL environment variable is not set");
}

export const createProfile =async (token , data)=>{
    //code body
   // console.log("Hello create profile",token,data);

    return await axios.post(`${API_URL}/api/profile`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })  
}



