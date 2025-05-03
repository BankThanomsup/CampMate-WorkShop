import axios from "axios";

export const uploadFileImage =async (token , form)=>{

    return await axios.post("http://localhost:5000/api/images",{image: form },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })  
}

