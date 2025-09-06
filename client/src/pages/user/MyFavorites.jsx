import CampingCard from "@/components/card/CampingCard";
import useCampingStore from "@/store/camping-store";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Heart, Tent } from "lucide-react";
import MiniLoadingSpinner from "@/components/ui/MiniLoadingSpinner";


const MyFavorites = () => {
  const{ getToken }= useAuth();
  const actionListFavorites = useCampingStore((state)=>state.actionListFavorite)
  const favorites = useCampingStore((state)=>state.favorites)
  const [loading, setLoading] = useState(true);



 useEffect(()=>{
  fetchFavorites();
 },[])



  const fetchFavorites =async()=>{
    const token = await getToken();
    setLoading(true);
    try {
      await actionListFavorites(token);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-red-100 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
            <p className="text-gray-600">แคมป์ปิ้งที่คุณชื่นชอบ</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          รายการแคมป์ปิ้งทั้งหมด: {favorites?.length || 0} แห่ง
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <MiniLoadingSpinner 
          size="medium"
          title="กำลังโหลดรายการโปรด"
          description="โปรดรอสักครู่ขณะที่เราดึงข้อมูลแคมป์ปิ้งที่คุณชื่นชอب..."
        />
      )}

      {/* Empty State */}
      {!loading && (!favorites || favorites.length === 0) && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            ยังไม่มีแคมป์ปิ้งที่ชื่นชอบ
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            เริ่มต้นสำรวจและกดหัวใจที่แคมป์ปิ้งที่คุณสนใจ เพื่อเก็บไว้ในรายการโปรดของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Tent className="w-5 h-5 mr-2" />
              สำรวจแคมป์ปิ้ง
            </a>
          </div>
        </div>
      )}

      {/* Favorites Grid */}
      {!loading && favorites && favorites.length > 0 && (
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
          {favorites.map((element) => {
            {/* console.log(element) */}
            return <CampingCard key={element.id} 
            camping={element.landmark}/> 
          })}
          {/* <div>campingLists</div> */}
        </section>
      )}
    </div>
  )
}

export default MyFavorites