import ReservationsContainer from "@/components/admin/ReservationsContainer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listUserReservations } from "@/api/admin";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { formatDate, formatNumber } from "@/utils/formats";
import MiniLoadingSpinner from "@/components/ui/MiniLoadingSpinner";

const MyReservations = () => {
  //JS
  const { getToken } = useAuth();
  const [reservations, setReservations] = useState([]);
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
      console.log("=== MY RESERVATIONS DEBUG ===");
      console.log("Fetching user reservations with token...");
      const res = await listUserReservations(token);
      console.log("User reservations response:", res);
      console.log("User reservations data:", res.data);
      console.log("User reservations result:", res.data.result);
      console.log("Number of user reservations:", res.data.result?.length || 0);
      if (res.data.result && res.data.result.length > 0) {
        res.data.result.forEach((reservation, index) => {
          console.log(`User Reservation ${index + 1}:`, {
            id: reservation.id,
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            landmarkId: reservation.landmarkId,
            total: reservation.total,
            landmark: reservation.landmark
          });
        });
      }
      console.log("=== END DEBUG ===");
      setReservations(res.data.result || []);
    } catch (error) {
      console.log(error);
      setError("ไม่สามารถโหลดข้อมูลการจองได้");
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ReservationsContainer showLoading={false} useUserStats={true} />

      {/* Table */}
      <div className="mt-8">
        <h1>
          Total Reservation : {reservations?.length || 0}
        </h1>
        
        {loading && (
          <MiniLoadingSpinner 
            size="medium"
            title="กำลังโหลดข้อมูลการจอง"
            description="โปรดรอสักครู่ขณะที่เราดึงข้อมูลการจองทั้งหมด..."
          />
        )}
        
        {error && (
          <div className="text-red-500 text-center py-4">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && (
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
              {/* <TableHead>Invoice</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {reservations?.map((item) => {
              const { id, total, totalNights, checkIn, checkOut } = item;
              const { title } = item.landmark;
              {
                /* console.log(item); */
              }
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatNumber(total)}</TableCell>
                  <TableCell>{formatDate(checkIn)}</TableCell>
                  <TableCell>{formatDate(checkOut)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
