
import useCampingStore from "@/store/camping-store";
import { TileLayer, Marker, Popup, LayersControl, LayerGroup, Tooltip } from "react-leaflet";
import '@/utils/leafletConfig';

const Layers = () => {
  const campings = useCampingStore((state) => state.campings);

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
          {campings?.map((element) => {
            {/* {
              console.log(element);
            } */}

            return (
              <Marker key={element.id} position={[element.lat, element.lng]}>
                <Popup>
                  <div className="text-center p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg">
                    <p className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{element.title}</p>
                    <img 
                      src={element.secure_url} 
                      alt={element.title}
                      className="w-48 h-32 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">฿{element.price.toLocaleString()}/คืน</p>
                  </div>
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
