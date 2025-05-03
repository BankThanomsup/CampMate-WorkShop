import useCampingStore from "@/store/camping-store"
import MapHome from "../map/MapHome"
import CampingLists from "./CampingLists"
import { useEffect } from "react"
const campingContainer = () => {
  const actionListCamping = useCampingStore((state)=>state.actionListCamping)

  useEffect(()=>{
    
    actionListCamping()
  },[])

  console.log("campingContainer",actionListCamping)

    
  return (
    <div>
        <MapHome />
        <CampingLists />
    </div>
  )
}

export default campingContainer