import { listBookings } from "@/api/booking";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatNumber } from "@/utils/formats";
import BookingPDF from "@/components/booking/BookingPDF";

const MyOrders = () => {
  //JS
  const { getToken } = useAuth();
  const [booking, setBookings] = useState();
  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    const token = await getToken();
    try {
      const res = await listBookings(token);
      setBookings(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>รหัสการจอง</TableHead>
            <TableHead>ชื่อ</TableHead>
            <TableHead>จำนวนคืน</TableHead>
            <TableHead>ราคารวม</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
        {booking?.map((item) => {
            const{id,total,totalNights,checkIn,checkOut} = item;
            const {title} = item.landmark;
            {/* console.log(item); */}
          return ( 
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{totalNights}</TableCell>
              <TableCell>{formatNumber(total)}</TableCell>
              <TableCell>{formatDate(checkIn)}</TableCell>
              <TableCell>{formatDate(checkOut)}</TableCell>
              <TableCell><BookingPDF booking={item} /></TableCell>
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyOrders;
