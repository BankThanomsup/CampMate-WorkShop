import { listMyCampings } from "@/api/admin";
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
import MiniLoadingSpinner from "@/components/ui/MiniLoadingSpinner";

const MyCampings = () => {
  //JS
  const { getToken } = useAuth();
  const [campings, setCampings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchCampings();
  }, []);

  const fetchCampings = async () => {
    const token = await getToken();
    try {
      setLoading(true);
      setError(null);
      const res = await listMyCampings(token);
      setCampings(res.data.result || []);
    } catch (error) {
      console.log(error);
      setError("ไม่สามารถโหลดข้อมูลแคมป์ปิ้งได้");
      setCampings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header with total count */}
      <div className="mb-4">
        <h1 className="mt-4">
          Total Campings : {campings?.length || 0}
        </h1>
      </div>

      {/* Loading State */}
      {loading && (
        <MiniLoadingSpinner 
          size="medium"
          title="กำลังโหลดข้อมูลแคมป์ปิ้ง"
          description="โปรดรอสักครู่ขณะที่เราดึงข้อมูลแคมป์ปิ้งของคุณ..."
        />
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
        <TableCaption>รายการแคมป์ปิ้งของคุณ</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>รหัส</TableHead>
            <TableHead>ชื่อ</TableHead>
            <TableHead>ราคา/คืน</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
        {campings?.map((item) => {
            const{id, title, price} = item;
            {/* const {title} = item.landmark; */}
            {/* console.log(item); */}
          return ( 
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{formatNumber(price)}</TableCell>
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
      )}
    </div>
  );
};

export default MyCampings;
