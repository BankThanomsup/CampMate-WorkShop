//rafce

import { checkOutStatus } from "@/api/booking"
import { createAlert } from "@/utils/createAlert"
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

const  CheckoutComplete = () => {
  const navigate = useNavigate();
  const {session} = useParams()
  const { getToken } = useAuth()
  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=>{
    //code
    fetchPayment()
  },[])

const fetchPayment = async () => {
    const token = await getToken()
    try {
      setIsLoading(true)
      const res = await checkOutStatus(token,session)
      setStatus(res.data.status)
      createAlert('success',res.data.message)
      
      if (res.data.status === 'complete') {
        // หน่วงเวลาเล็กน้อยเพื่อให้ผู้ใช้เห็น success state
        setTimeout(() => {
          navigate('/user/myorders');      
        }, 1500);
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false) 
    }
  };

  if (status === 'open') {
    return <Navigate to="/" />;
  }

  // แสดง Loading Spinner ขณะประมวลผล
  if (isLoading) {
    if (status === 'complete') {
      return (
        <LoadingSpinner 
          type="success"
          title="ชำระเงินสำเร็จ! 🎉"
          description="กำลังนำคุณไปยังหน้ารายการจองของคุณ..."
        />
      );
    }
    
    return (
      <LoadingSpinner 
        type="payment"
        title="กำลังตรวจสอบการชำระเงิน"
        description="โปรดรอสักครู่ขณะที่เราตรวจสอบสถานะการชำระเงินของคุณ..."
      />
    );
  }

  return (
    <LoadingSpinner 
      type="processing"
      title="กำลังประมวลผล..."
      description="โปรดรอสักครู่"
    />
  )
}

export default CheckoutComplete