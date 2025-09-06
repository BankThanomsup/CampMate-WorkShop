import { useState } from "react";
import StateCard from "./StateCard";
import { listStats } from "@/api/admin";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import MiniLoadingSpinner from "@/components/ui/MiniLoadingSpinner";

const StateContainer = () => {
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
      const res = await listStats(token);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MiniLoadingSpinner 
        size="medium"
        title="กำลังโหลดข้อมูลสถิติ"
        description="โปรดรอสักครู่ขณะที่เราดึงข้อมูลภาพรวมระบบ..."
      />
    );
  }

  return (
    <div className="mt-4 gap-4 grid lg:grid-cols-3 md:grid-cols-2">
      <StateCard label="Users" value={data?.usersCount || 0} />
      <StateCard label="Campings" value={data?.campingCount || 0} />
      <StateCard label="Bookings" value={data?.bookingCount || 0} />
    </div>
  );
};

export default StateContainer;
