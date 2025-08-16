import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    console.error("VITE_API_URL environment variable is not set");
}

export const getBookings =async (token )=>{

    return await axios.get(`${API_URL}/api/bookings`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}

export const listBookings =async (token)=>{

    return await axios.get(`${API_URL}/api/bookings`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}





export const createBooking =async (token , data)=>{

    return await axios.post(`${API_URL}/api/booking`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}


export const checkOut = async (token , id)=>{

    return await axios.post(`${API_URL}/api/checkout`,{id},
        {
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}

export const checkOutStatus = async (token , session)=>{

    return await axios.get(`${API_URL}/api/checkout-status/${session}`,{
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
}