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
import { listAllReservations } from "@/api/admin";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { formatDate, formatNumber } from "@/utils/formats";

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
      const res = await listAllReservations(token);
      console.log(res);
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
      <ReservationsContainer />

      {/* Table */}
      <div className="mt-8">
        <h1>
          Total Reservation : {reservations?.length || 0}
        </h1>
        
        {loading && (
          <div className="text-center py-4">
            <p>Loading...</p>
          </div>
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
