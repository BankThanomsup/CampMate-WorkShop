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
  const [booking, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    const token = await getToken();
    try {
      setLoading(true);
      setError(null);
      const res = await listBookings(token);
      setBookings(res.data.result || []);
    } catch (error) {
      console.log(error);
      setError("ไม่สามารถโหลดข้อมูลการจองได้");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header with total count */}
      <div className="mb-4">
        <h1 className="mt-5">
          Total Orders : {booking?.length || 0}
        </h1>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <p>Loading...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="text-red-500 text-center py-4">
          <p>{error}</p>
        </div>
      )}
      
      {/* Table - only show when not loading and no error */}
      {!loading && !error && (
        <Table>
        <TableCaption>รายการการจองของคุณ</TableCaption>

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
      )}
    </div>
  );
};

export default MyOrders;
