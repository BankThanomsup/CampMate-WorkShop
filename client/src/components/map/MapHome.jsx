
import { MapContainer } from "react-leaflet";
import Layers from "./Layers";
import 'leaflet/dist/leaflet.css';
import '@/utils/leafletConfig';




const MapHome = () => {
 
  // console.log("landmarks", landmarks);
  return (
    <div>
      <MapContainer
        className="h-[50vh] rounded-md z-0"
        center={[13.7563, 100.5018]} // ใช้พิกัดกรุงเทพฯ เหมือน MainMap
        zoom={7} // ใช้ซูมเดียวกันกับ MainMap
        scrollWheelZoom={true}
      >

        <Layers />
      </MapContainer>
    </div>
  );
};

export default MapHome;
