//rafce

import { checkOutStatus } from "@/api/booking"
import { createAlert } from "@/utils/createAlert"
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router"

const  CheckoutComplete = () => {
  const navigate = useNavigate();
  const {session} = useParams()
  const { getToken } = useAuth()
  const [status, setStatus] = useState(null)
  // console.log(session)
  useEffect(()=>{
    //code
    fetchPayment()
  },[])
const fetchPayment = async () => {
    const token = await getToken()
    try {

      const res = await checkOutStatus(token,session)
      setStatus(res.data.status)
      createAlert('success',res.data.message)
      if (res.data.status === 'completed') {
        navigate('/user/myorders');      
      }
    } catch (error) {
      console.log(error) 
    }
  };

  if (status === 'open') {

    return <Navigate to="/" />;
  }



  return (
    <div>Loading...</div>
  )
}

export default CheckoutComplete