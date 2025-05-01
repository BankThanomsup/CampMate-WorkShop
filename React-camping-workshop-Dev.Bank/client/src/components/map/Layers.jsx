import { listCamping } from "@/api/camping";

import { useEffect, useState } from "react";

import { TileLayer, Marker, Popup, LayersControl, LayerGroup, Tooltip } from "react-leaflet";
const Layers = () => {
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
  return (
    <LayersControl>
      <LayersControl.BaseLayer name="OSM" checked>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Sattellite">
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
      </LayersControl.BaseLayer>

      {/* Overlay Layers */}
      <LayersControl.Overlay name="Landmark" checked>
        <LayerGroup>
          {landmarks?.map((element) => {
            {/* {
              console.log(element);
            } */}

            return (
              <Marker key={element.id} position={[element.lat, element.lng]}>
                <Popup>
                  {element.title} <br /> {element.description}
                </Popup>
                <Tooltip>
                    {
                        element.title
                    }
                </Tooltip>
              </Marker>
            );
          })}
        </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default Layers;
