import useBookingStore from "@/store/booking-store"
import {
  Card,
  CardTitle

} from "@/components/ui/card"

import { calToTal } from "@/utils/Booking";
import { formatNumber } from "@/utils/formats";
import BookingConFirm from "./BookingConfirm";







const BookingFrom = () => {
    const price =useBookingStore((state)=>state.price);
    const range = useBookingStore((state)=>state.range)
    const checkIn = range?.from
    const checkOut = range?.to

  const result = calToTal(checkIn,checkOut,price)
  console.log(result)

  if(!range || !range.from || !range.to) return null;


  return (
    <div>
      <Card className="p-8 my-2 ">
         <CardTitle className="mb-4">
          สรุป
         </CardTitle>
         <p className="flex justify-between">
         <span>{`฿${price} x ${result.totalNight} คืน`}</span>
          <span className="font font-semibold">{formatNumber(result.total)}</span>
         </p>
      </Card>
    <BookingConFirm />
    </div>
  )
}

export default BookingFrom