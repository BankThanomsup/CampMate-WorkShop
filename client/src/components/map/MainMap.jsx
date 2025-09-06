import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents,Marker,Popup, LayersControl, LayerGroup, Tooltip } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import '@/utils/leafletConfig';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, MapPin } from "lucide-react";
import { boolean } from "zod";
import useCampingStore from "@/store/camping-store";

function LocationMarker({position , setPosition,setValue}) {

    const map = useMapEvents({
      click:(e)=>{
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

const MainMap = ({register,location,setValue}) => {
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
        
        {
            position && <p className="text-sm text-gray-600 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Coordinates : {position.lat.toFixed(6)} , {position.lng.toFixed(6)}
            </p>
        }
        
      <MapContainer
      className="h-[50vh] rounded-md z-0"
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
        
        <LocationMarker position={position} setPosition={setPosition} setValue={setValue}/>
      </MapContainer>
    </div>
  );
};

export default MainMap;
