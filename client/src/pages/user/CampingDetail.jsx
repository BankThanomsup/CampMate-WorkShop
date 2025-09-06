import { useParams } from "react-router";
import axios from "axios";
import { readCamping, getCampingBookings } from "@/api/camping";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/campingDetail/Breadcrumbs";
import ImageContainer from "@/components/campingDetail/ImageContainer";
import Description from "@/components/campingDetail/Description";
import MainMap from "@/components/map/MainMap";
import BookingContainer from "@/components/booking/BookingContainer";

function CampingDetail() {
  const { id } = useParams();
  const [camping, setCamping] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    //code
    fetchCampingDetail(id);
    fetchBookings(id);
  }, []);

  const fetchCampingDetail = async (id) => {
    try {
      const res = await readCamping(id);
      setCamping(res.data.result);
    } catch (error) {
      console.error("Error fetching camping detail:", error);
    }
  };

  const fetchBookings = async (campingId) => {
    try {
      const res = await getCampingBookings(campingId);
      console.log("Camping bookings for ID", campingId, ":", res.data);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching camping bookings:", error);
      // ถ้าไม่สามารถดึงข้อมูลได้ ให้ใช้ array ว่าง
      setBookings([]);
    }
  };
    // console.log(camping)

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumbs name={camping.title} />
      {/* Header */}
      <header className="mt-6 mb-8">
        {/* title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{camping.title}</h1>
      </header>

      {/* image */}
      <ImageContainer image={camping.secure_url} name={camping.name}/>

      {/* Description & Map*/}
      <section className="lg:grid grid-cols-12 gap-8 mt-12 space-y-8 lg:space-y-0">

      <div className="lg:col-span-8 col-span-12 space-y-8">
        <Description text={camping.description} camping={camping}/>
        
        {/* Location Map */}
        {camping.lat && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📍</span>
              <h2 className="text-2xl font-semibold text-gray-900">ตำแหน่งที่ตั้ง</h2>
            </div>
            <MainMap location={[camping.lat, camping.lng]}/>
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="lg:col-span-4 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📅</span>
            <h2 className="text-2xl font-semibold text-gray-900">จองที่พัก</h2>
          </div>
          <BookingContainer campingId={camping.id} price={camping.price} bookings={bookings}/>
        </div>
      </div>

      </section>

    </div>
  );
}

export default CampingDetail;
