import { useParams } from "react-router";
import axios from "axios";
import { readCamping } from "@/api/camping";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/campingDetail/Breadcrumbs";
import ImageContainer from "@/components/campingDetail/ImageContainer";
import Description from "@/components/campingDetail/Description";
import MainMap from "@/components/map/MainMap";
import BookingContainer from "@/components/booking/BookingContainer";

function CampingDetail() {
  const { id } = useParams();
  // console.log(id)
  const [camping, setCamping] = useState([]);

  useEffect(() => {
    //code
    fetchCampingDetail(id);
  }, []);



  const fetchCampingDetail = async (id) => {


    try {
      const res = await readCamping(id);
      setCamping(res.data.result);
    } catch (error) {
      console.error("Error fetching camping detail:", error);
    }
  };
    // console.log(camping)

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumbs name={camping.title} />
      {/* Header */}
      <header className="flex items-center justify-between mt-2">
        {/* title */}
        <h1 className="text-3xl font-bold">{camping.title}</h1>
        <div className="flex gap-4">
          {/* ShareButton */}
          <p>Share</p>
          {/* FavoriteButton */}
          <p>Favorite</p>
        </div>
      </header>

      {/* image */}
      <ImageContainer image={camping.secure_url} name={camping.name}/>

      {/* Description & Map*/}
      <section className="lg:grid grid-cols-12 gap-x-12 mt-12">

      <div className="lg:col-span-8 col-span-12">
      <Description text={camping.description}/>
       {
        camping.lat && <MainMap location={[camping.lat , camping.lng]}/>
       } 
      </div>

      {/* Calendar */}
      <div className="lg:col-span-4 flex flex-col items-center">
        <BookingContainer campingId={camping.id} price={camping.price} bookings={[]}/>
      </div>

      </section>

    </div>
  );
}

export default CampingDetail;
