import { Calendar } from "@/components/ui/calendar";
import useBookingStore from "@/store/booking-store";
import { useEffect, useState } from "react";

const defaultSelected = {
  from: undefined,
  to: undefined,
};

const BookingCalendar = () => {

  const [range, setRange] = useState(defaultSelected);
//   console.log(range)
    useEffect(()=>{
        useBookingStore.setState({
            range: range,

        });
        // console.log('bank')
    },[range])
  return (
  
    <div className="mt-5">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        //disabled={range}
        className="rounded-md border"
      />
    </div>
  );
};

export default BookingCalendar;
