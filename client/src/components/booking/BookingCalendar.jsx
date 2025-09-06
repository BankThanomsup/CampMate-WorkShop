import { Calendar } from "@/components/ui/calendar";
import useBookingStore from "@/store/booking-store";
import { useEffect, useState } from "react";

const defaultSelected = {
  from: undefined,
  to: undefined,
};

const BookingCalendar = () => {
  const [range, setRange] = useState(defaultSelected);
  const { bookings } = useBookingStore();
  
  console.log("BookingCalendar received bookings:", bookings);
  
  // วันปัจจุบัน (เริ่มต้นของวัน)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // สร้างรายการวันที่ถูกจองแล้ว
  const bookedDates = [];
  if (bookings && bookings.length > 0) {
    bookings.forEach(booking => {
      console.log("Processing booking:", booking);
      if (booking.checkIn && booking.checkOut) {
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        
        console.log("Check-in:", checkIn, "Check-out:", checkOut);
        
        // เพิ่มทุกวันในช่วงที่ถูกจอง
        for (let date = new Date(checkIn); date < checkOut; date.setDate(date.getDate() + 1)) {
          bookedDates.push(new Date(date));
        }
      }
    });
  }
  
  console.log("Booked dates:", bookedDates);
  
  // วันที่ไม่สามารถเลือกได้
  const disabledDays = [
    { before: today }, // วันที่ในอดีต
    ...bookedDates // วันที่ถูกจองแล้ว
  ];

  // ฟังก์ชันตรวจสอบว่าช่วงวันที่ที่เลือกมีวันที่ถูกจองหรือไม่
  const isRangeValid = (from, to) => {
    if (!from || !to) return true;
    
    const startDate = new Date(from);
    const endDate = new Date(to);
    
    for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
      if (bookedDates.some(bookedDate => 
        bookedDate.toDateString() === date.toDateString()
      )) {
        return false;
      }
    }
    return true;
  };

  // ฟังก์ชันสำหรับจัดการการเลือกวันที่
  const handleSelect = (selectedRange) => {
    if (!selectedRange) {
      setRange(defaultSelected);
      return;
    }

    // ถ้าเลือกวันเดียว (เริ่มต้น range)
    if (selectedRange.from && !selectedRange.to) {
      const selectedDate = new Date(selectedRange.from);
      
      // ตรวจสอบว่าวันที่เลือกไม่ใช่วันที่ถูกจอง
      if (bookedDates.some(bookedDate => 
        bookedDate.toDateString() === selectedDate.toDateString()
      )) {
        return; // ไม่ให้เลือกวันที่ถูกจอง
      }
      
      setRange(selectedRange);
      return;
    }

    // ถ้าเลือกช่วงวันที่
    if (selectedRange.from && selectedRange.to) {
      const fromDate = new Date(selectedRange.from);
      const toDate = new Date(selectedRange.to);
      
      // ตรวจสอบว่า check-in และ check-out ไม่ใช่วันเดียวกัน
      if (fromDate.getTime() === toDate.getTime()) {
        return; // ไม่ให้เลือกวันเดียวกัน
      }

      // ตรวจสอบว่า check-out มาหลัง check-in
      if (toDate <= fromDate) {
        // ถ้าเลือกวันที่ย้อนหลัง ให้เริ่มต้นใหม่ด้วยวันที่ที่เลือก
        setRange({
          from: selectedRange.to,
          to: undefined
        });
        return;
      }

      // ตรวจสอบว่าช่วงวันที่ไม่มีวันที่ถูกจอง
      if (!isRangeValid(fromDate, toDate)) {
        // ถ้ามีวันที่ถูกจอง ให้เริ่มต้นใหม่
        setRange({
          from: selectedRange.to,
          to: undefined
        });
        return;
      }

      setRange(selectedRange);
    }
  };

  useEffect(() => {
    useBookingStore.setState({
      range: range,
    });
  }, [range]);

  return (
    <div className="mt-5 w-full">
      <Calendar
        mode="range"
        selected={range}
        onSelect={handleSelect}
        disabled={disabledDays}
        className="rounded-md border w-full"
        numberOfMonths={1}
        // เพิ่ม modifiers สำหรับแสดงสถานะพิเศษ
        modifiers={{
          booked: bookedDates,
        }}
        modifiersStyles={{
          booked: {
            backgroundColor: '#ef4444',
            color: 'white',
            textDecoration: 'line-through',
          },
        }}
      />
      
      {/* แสดงข้อมูลการเลือก */}
      {range.from && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
          <div className="font-medium text-blue-800 mb-1">การเลือกของคุณ:</div>
          <div className="text-blue-700">
            <div>เช็คอิน: {range.from.toLocaleDateString('th-TH', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })}</div>
            {range.to && (
              <div>เช็คเอาท์: {range.to.toLocaleDateString('th-TH', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}</div>
            )}
            {range.from && range.to && (
              <div className="mt-1 font-medium">
                จำนวน: {Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24))} คืน
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* คำแนะนำ */}
      <div className="mt-3 text-xs text-gray-500 space-y-1">
        <div>💡 เลือกวันเช็คอินก่อน จากนั้นเลือกวันเช็คเอาท์</div>
        <div>🚫 วันที่แสดงสีแดงคือวันที่ถูกจองแล้ว</div>
        <div>⏰ ไม่สามารถเลือกวันที่ในอดีตได้</div>
      </div>
    </div>
  );
};

export default BookingCalendar;
