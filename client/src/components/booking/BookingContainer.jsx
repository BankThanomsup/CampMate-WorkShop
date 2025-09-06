import { useEffect } from "react"
import BookingCalendar from "./BookingCalendar"
import BookingFrom from "./BookingFrom"
import useBookingStore from "@/store/booking-store"
const BookingContainer = ({campingId,price,bookings}) => {
  // console.log("=== BOOKING CONTAINER DEBUG ===");
  // console.log("BookingContainer received props:");
  // console.log("- campingId:", campingId);
  // console.log("- price:", price);
  // console.log("- bookings:", bookings);
  // console.log("=== END BOOKING CONTAINER DEBUG ===");

  useEffect(()=>{
    console.log("BookingContainer useEffect triggered");
    console.log("Setting booking store with:", {
      campingId: campingId,
      price: price,
      bookings: bookings,
    });
    
    useBookingStore.setState({
        campingId:campingId,
        price:price,
        bookings: bookings,
    })
  },[campingId, bookings]) // เพิ่ม bookings ใน dependency
    return (
    <div className="flex flex-col mb-8 w-full">
        <BookingCalendar />
        <BookingFrom />
    </div>
  )
}

export default BookingContainer