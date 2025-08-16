
import { MapContainer, useMap } from "react-leaflet";
import Layers from "./Layers";
import useCampingStore from "@/store/camping-store";
import 'leaflet/dist/leaflet.css';
import '@/utils/leafletConfig';

const MyCenter =( ) =>{

  const center = useCampingStore((state) => state.center)
  // console.log(center)
  const map = useMap()
  if(!center){
    return null;
  }

  map.flyTo(center,8)

  return null;
}




const MapHome = () => {
 
  // console.log("landmarks", landmarks);
  return (
    <div>
      <MapContainer
        className="h-[50vh] rounded-md z-0"
        center={[13, 100]}
        zoom={7}
        scrollWheelZoom={true}
      >

        <Layers />
      <MyCenter />
      </MapContainer>
    </div>
  );
};

export default MapHome;
