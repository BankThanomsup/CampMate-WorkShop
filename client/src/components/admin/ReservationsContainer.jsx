import { listReservations } from "@/api/admin";
import { useState } from "react";
import StateCard from "./StateCard";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const ReservationsContainer = () => {
  //js
  const [data, setData] = useState();
  const { getToken } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    //code body
    const token = await getToken();
    try {
      const res = await listReservations(token);
      // console.log(res); 
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-4 gap-4 grid lg:grid-cols-3 md:grid-cols-2">
      <StateCard label="Category" value={data?.campings || 0} />
      <StateCard label="Nights" value={data?.nights || 0} />
      <StateCard label="Totals" value={data?.totals || 0} />
    </div>
  );
};

export default ReservationsContainer;
