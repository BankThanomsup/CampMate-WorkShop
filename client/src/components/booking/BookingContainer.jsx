import { useEffect } from "react"
import BookingCalendar from "./BookingCalendar"
import BookingFrom from "./BookingFrom"
import useBookingStore from "@/store/booking-store"
const BookingContainer = ({campingId,price,bookings}) => {
//   console.log(campingId,price,bookings)

  useEffect(()=>{
    useBookingStore.setState({
        campingId:campingId,
        price:price,
        bookings: bookings,
    })
  },[campingId])
    return (
    <div className="flex flex-col mb-8 w-full">
        <BookingCalendar />
        <BookingFrom />
    </div>
  )
}

export default BookingContainer