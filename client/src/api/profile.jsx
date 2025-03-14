import axios from "axios";

export const createProfile =async (token , data)=>{
    //code body
   // console.log("Hello create profile",token,data);

    return await axios.post("http://localhost:5000/api/profile",data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}



