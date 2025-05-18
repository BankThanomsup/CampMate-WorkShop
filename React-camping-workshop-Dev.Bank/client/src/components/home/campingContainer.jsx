import useCampingStore from "@/store/camping-store"
import MapHome from "../map/MapHome"
import CampingLists from "./CampingLists"
import { useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
const campingContainer = () => {
  const actionListCamping = useCampingStore((state)=>state.actionListCamping)

  //clerk
  const { user } = useUser()
  useEffect(()=>{

    // || find first true
    // && find first false
    // ?? nullish null or undefined --> right
    const id = user?.id ?? null;
    // console.log("id", id)
    actionListCamping(id)
  },[user?.id])

  // console.log("campingContainer",actionListCamping)

    
  return (
    <div>
        <MapHome />
        <CampingLists />
    </div>
  )
}

export default campingContainer