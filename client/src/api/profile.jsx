import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const createProfile =async (token , data)=>{
    //code body
   // console.log("Hello create profile",token,data);

    return await axios.post(`${API_URL}/api/profile`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })  
}



