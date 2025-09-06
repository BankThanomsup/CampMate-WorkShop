import { listReservations, listUserReservationStats } from "@/api/admin";
import { useState } from "react";
import StateCard from "./StateCard";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import MiniLoadingSpinner from "@/components/ui/MiniLoadingSpinner";

const ReservationsContainer = ({ showLoading = true, useUserStats = false }) => {
  //js
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    //code body
    const token = await getToken();
    try {
      setLoading(true);
      const res = useUserStats 
        ? await listUserReservationStats(token)
        : await listReservations(token);
      // console.log(res); 
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && showLoading) {
    return (
      <MiniLoadingSpinner 
        size="medium"
        title="กำลังโหลดข้อมูลการจอง"
        description="โปรดรอสักครู่ขณะที่เราดึงข้อมูลสถิติการจอง..."
      />
    );
  }

  return (
    <div className="mt-4 gap-4 grid lg:grid-cols-3 md:grid-cols-2">
      <StateCard label="Category" value={data?.campings || 0} />
      <StateCard label="Nights" value={data?.nights || 0} />
      <StateCard label="Totals" value={data?.totals || 0} />
    </div>
  );
};

export default ReservationsContainer;
