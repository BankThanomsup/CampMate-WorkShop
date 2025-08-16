import CampingCard from "@/components/card/CampingCard";
import useCampingStore from "@/store/camping-store";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react"


const MyFavorites = () => {
  const{ getToken }= useAuth();
  const actionListFavorites = useCampingStore((state)=>state.actionListFavorite)
  const favorites = useCampingStore((state)=>state.favorites)



 useEffect(()=>{
  fetchFavorites();
 },[])



  const fetchFavorites =async()=>{
    const token = await getToken();
    actionListFavorites(token)
  }

  return (
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
      {favorites.map((element) => {
        {/* console.log(element) */}
        return <CampingCard key={element.id} 
        camping={element.landmark}/> 
      })}
      {/* <div>campingLists</div> */}
    </section>
  )
}

export default MyFavorites