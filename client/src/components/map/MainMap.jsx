import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents,Marker,Popup, LayersControl, LayerGroup, Tooltip } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import '@/utils/leafletConfig';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, MapPin } from "lucide-react";
import { boolean } from "zod";
import useCampingStore from "@/store/camping-store";

function LocationMarker({position , setPosition,setValue, readonly = false}) {

    const map = useMapEvents({
      click:(e)=>{
        // ถ้าเป็น readonly mode ไม่ให้ปักหมุดได้
        if (readonly) return;
        
        // console.log(e.latlng)
        setPosition(e.latlng)
        map.flyTo(e.latlng)
        if(setValue){

            setValue('lat',e.latlng.lat)
            setValue('lng',e.latlng.lng)
        }
    },
    })

    // เมื่อ position เปลี่ยน ให้ map บินไปยังตำแหน่งใหม่
    React.useEffect(() => {
      if (position) {
        // ใช้ setView แทน flyTo เพื่อความเร็ว หรือลด duration
        map.setView(position, 16, {
          animate: true,
          duration: 0.5 // ลดเวลา animation เหลือ 0.5 วินาที
        });
      }
    }, [position, map]);
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>📍 ตำแหน่งที่เลือก</Popup>
      </Marker>
    )
  }

const MainMap = ({register,location,setValue, showSearch = false, readonly = false}) => {
    //javascript
  const [position, setPosition] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false) // เพิ่ม state สำหรับควบคุมการแสดงผล
  const [justSelected, setJustSelected] = useState(false) // เพิ่ม flag เพื่อป้องกันการค้นหาซ้ำ
  const isManualUpdate = useRef(false) // ใช้ ref เพื่อติดตามการอัปเดตด้วยตนเอง
  
  // ดึงข้อมูลจาก camping store
  const campings = useCampingStore((state) => state.campings);
  
  // ใช้กรุงเทพมหานครเป็นจุดกึ่งกลางหลัก
  const BANGKOK_LOCATION = [13.7563, 100.5018]; // พิกัดกรุงเทพมหานคร
  
  // ใช้ location ที่ส่งมา หรือ กรุงเทพมหานคร
  const mapCenter = location || BANGKOK_LOCATION;

  // ฟังก์ชันค้นหาตำแหน่งด้วย Nominatim API
  const searchLocation = async (query) => {
    if (!query.trim() || query.trim().length < 2) return; // ลดจาก 3 เป็น 2 ตัวอักษร
    
    setIsSearching(true);
    try {
      // ค้นหาในประเทศไทยก่อน (เพิ่ม limit)
      const thaiResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=th&limit=5&addressdetails=1`
      );
      const thaiData = await thaiResponse.json();
      
      // ถ้าไม่พบในไทย ให้ค้นหาทั่วโลก (ลด limit สำหรับความเร็ว)
      let allResults = [...thaiData];
      if (thaiData.length < 3) {
        const globalResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=${3 - thaiData.length}&addressdetails=1`
        );
        const globalData = await globalResponse.json();
        allResults = [...thaiData, ...globalData];
      }
      
      if (allResults.length > 0) {
        setSearchResults(allResults);
        setShowResults(true); // แสดง dropdown เมื่อพบผลลัพธ์
      } else {
        setSearchResults([]);
        setShowResults(false); // ซ่อน dropdown เมื่อไม่พบผลลัพธ์
        if (query.trim().length > 2) {
          console.log("ไม่พบสถานที่ที่ค้นหา");
        }
      }
    } catch (error) {
      console.error("Error searching location:", error);
      setSearchResults([]);
      setShowResults(false); // ซ่อน dropdown เมื่อเกิดข้อผิดพลาด
    } finally {
      setIsSearching(false);
    }
  };

  // ฟังก์ชันเลือกตำแหน่งจากผลการค้นหา
  const selectLocation = (result) => {
    const { lat, lon, display_name } = result
    const newPosition = {
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    };
    
    setPosition(newPosition);
    setSearchResults([]); // ซ่อนผลการค้นหา
    setShowResults(false); // ซ่อน dropdown
    
    // ตั้งค่า flag เพื่อป้องกันการค้นหาอัตโนมัติ
    isManualUpdate.current = true;
    setJustSelected(true); // ตั้ง flag ว่าเพิ่งเลือกสถานที่
    setSearchQuery(display_name); // แสดงชื่อสถานที่ที่เลือกในช่อง input
    
    if (setValue) {
      setValue('lat', newPosition.lat);
      setValue('lng', newPosition.lng);
    }
  };

  // Auto search เมื่อพิมพ์ (debounce)
  useEffect(() => {
    // ถ้าเป็นการอัปเดตด้วยตนเอง (เลือกจากผลการค้นหา) ไม่ต้องค้นหาซ้ำ
    if (isManualUpdate.current) {
      isManualUpdate.current = false; // รีเซ็ต flag
      setJustSelected(false); // รีเซ็ต flag
      return;
    }

    // ถ้าเพิ่งเลือกสถานที่ ไม่ต้องค้นหาซ้ำ
    if (justSelected) {
      setJustSelected(false); // รีเซ็ต flag
      return;
    }

    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 1) { // ลดจาก 2 เป็น 1 ตัวอักษร
        searchLocation(searchQuery);
        setShowResults(true); // แสดง dropdown เมื่อมีการค้นหา
      } else {
        setSearchResults([]);
        setShowResults(false); // ซ่อน dropdown เมื่อไม่มีการค้นหา
      }
    }, 300); // ลดจาก 500ms เป็น 300ms เพื่อความเร็ว

    return () => clearTimeout(timeoutId);
  }, [searchQuery]); // ลบ justSelected ออกจาก dependency เพื่อป้องกันการ trigger ซ้ำ

  const roitai = register && 'ok'
  // console.log(roitai) 

    return (
    
    <div>
        {
            register &&<>
            
            <input hidden {...register('lat')} />
            <input hidden  {...register('lng')} />
            
            </>
        }
        
        {/* Search Input Container */}
        {showSearch && (
        <div className="relative mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ค้นหาสถานที่ เช่น กรุงเทพ, เชียงใหม่, หรือชื่อถนน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => selectLocation(result)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {result.display_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            📍 {parseFloat(result.lat).toFixed(4)}, {parseFloat(result.lon).toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Loading State */}
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* No Results Message */}
          {showResults && searchResults.length === 0 && searchQuery.trim().length > 2 && !isSearching && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
              <p className="text-sm text-gray-500 text-center">
                ไม่พบสถานที่ที่ค้นหา
              </p>
            </div>
          )}
        </div>
        )}
        
        {
            position && <p className="text-sm text-gray-600 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Coordinates : {position.lat.toFixed(6)} , {position.lng.toFixed(6)}
            </p>
        }
        
      <MapContainer
      className={`h-[50vh] rounded-md z-0 ${readonly ? 'cursor-default' : 'cursor-crosshair'}`}
     center={mapCenter} 
      zoom={location ? 10 : 7} 
      scrollWheelZoom={true}>
        
        <LayersControl>
          <LayersControl.BaseLayer name="OSM" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          {/* Overlay Layers */}
          <LayersControl.Overlay name="Camping Sites" checked>
            <LayerGroup>
              {/* แสดงหมุดของสถานที่ที่มีอยู่ (ถ้ามี location) */}
              {location && (
                <Marker position={location}>
                  <Popup>📍 ตำแหน่งปัจจุบัน</Popup>
                </Marker>
              )}
              
              {/* แสดงหมุดของแคมป์ปิ้งทั้งหมด */}
              {campings && campings.map((camping) => (
                camping.lat && camping.lng && (
                  <Marker 
                    key={camping.id} 
                    position={[camping.lat, camping.lng]}
                  >
                    <Popup>
                      <div className="min-w-[200px] text-center">
                        <h3 className="font-bold text-sm mb-1">{camping.title}</h3>
                        {camping.imageUrls && camping.imageUrls[0] && (
                          <img 
                            src={camping.imageUrls[0]} 
                            alt={camping.title}
                            className="w-full h-20 object-cover rounded mb-2"
                          />
                        )}
                        {camping.secure_url && (
                          <img 
                            src={camping.secure_url} 
                            alt={camping.title}
                            className="w-full h-20 object-cover rounded mb-2"
                          />
                        )}
                        <p className="text-xs text-gray-600 mb-1">
                          📍 {camping.lat.toFixed(4)}, {camping.lng.toFixed(4)}
                        </p>
                        <p className="text-xs text-gray-700">
                          {camping.description?.substring(0, 100)}...
                        </p>
                      </div>
                    </Popup>
                    <Tooltip>
                      {camping.title}
                    </Tooltip>
                  </Marker>
                )
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        
        <LocationMarker position={position} setPosition={setPosition} setValue={setValue} readonly={readonly}/>
      </MapContainer>
    </div>
  );
};

export default MainMap;
