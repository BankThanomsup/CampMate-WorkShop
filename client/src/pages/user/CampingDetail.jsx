import { useParams } from "react-router";
import axios from "axios";
import { readCamping, getUserCampingBookings } from "@/api/camping";
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/campingDetail/Breadcrumbs";
import ImageContainer from "@/components/campingDetail/ImageContainer";
import Description from "@/components/campingDetail/Description";
import MainMap from "@/components/map/MainMap";
import BookingContainer from "@/components/booking/BookingContainer";

function CampingDetail() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const [camping, setCamping] = useState({}); // เปลี่ยนจาก [] เป็น {}
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    //code
    fetchCampingDetail(id);
    fetchUserBookings(id);
  }, []);

  const fetchCampingDetail = async (id) => {
    try {
      const res = await readCamping(id);
      setCamping(res.data.result);
    } catch (error) {
      console.error("Error fetching camping detail:", error);
    }
  };

  const fetchUserBookings = async (campingId) => {
    try {
      const token = await getToken();
      const res = await getUserCampingBookings(token, campingId);
      console.log("=== USER CAMPING BOOKINGS DEBUG ===");
      console.log("Camping ID:", campingId);
      console.log("User's bookings for this camping:", res.data);
      console.log("Number of user bookings:", res.data?.length || 0);
      if (res.data && res.data.length > 0) {
        res.data.forEach((booking, index) => {
          console.log(`User Booking ${index + 1}:`, {
            id: booking.id,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            landmarkId: booking.landmarkId,
            profileId: booking.profileId,
            paymentStatus: booking.paymentStatus
          });
        });
      }
      console.log("=== END DEBUG ===");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching user camping bookings:", error);
      // ถ้าไม่สามารถดึงข้อมูลได้ ให้ใช้ array ว่าง
      setBookings([]);
    }
  };
    // console.log(camping)

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs name={camping.title} />
      {/* Header */}
      <header className="mt-6 mb-8">
        {/* title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{camping.title}</h1>
      </header>

      {/* image */}
      <ImageContainer image={camping.secure_url} name={camping.name}/>

      {/* Description & Map*/}
      <section className="lg:grid grid-cols-12 gap-8 mt-12 space-y-8 lg:space-y-0">

      <div className="lg:col-span-8 col-span-12 space-y-8">
        <Description text={camping.description} camping={camping}/>
        
        {/* Location Map */}
        {camping.lat && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📍</span>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">ตำแหน่งที่ตั้ง</h2>
            </div>
            <MainMap location={[camping.lat, camping.lng]} readonly={true}/>
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="lg:col-span-4 flex flex-col">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-6 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📅</span>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">จองที่พัก</h2>
          </div>
          {/* เช็คว่ามีข้อมูล camping แล้วค่อยส่ง props */}
          {camping.id && (
            <BookingContainer 
              campingId={camping.id} 
              price={camping.price} 
              bookings={bookings}
            />
          )}
        </div>
      </div>

      </section>

    </div>
  );
}

export default CampingDetail;
