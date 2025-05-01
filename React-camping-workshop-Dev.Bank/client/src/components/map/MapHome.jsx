import { listCamping } from "@/api/camping";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapHome = () => {
  console.log("MapHome rendered");
  const [landmarks, setlandmarks] = useState([]);

  useEffect(() => {
    //code first time render
    hdlGetLandmarks();
  }, []);

  const hdlGetLandmarks = () => {
    console.log("Fetching landmarks...");
    listCamping()
      .then((res) => {
        setlandmarks(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("landmarks", landmarks);
  return (
    <div>
      <MapContainer
        className="h-[50vh] rounded-md z-0"
        center={[13, 100]}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {landmarks?.map((element) => {
          {
            /* console.log('element', element.title); */
          }

          return (
            <Marker position={[element.lat, element.lng]}>
              <Popup>
                {element.title} <br /> {element.description}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapHome;
