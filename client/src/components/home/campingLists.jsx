
import CampingCard from "../card/CampingCard";
import useCampingStore from "@/store/camping-store";
import EmptyList from "./EmptyList";
import LoadingSpinner from "./LoadingSpinner";


const CampingLists = () => {

  // const[campings, setCamping] = useState([]);
    // console.log("campingLists",campings)
  const campings = useCampingStore((state)=>(state.campings));
  const isLoading = useCampingStore((state)=>(state.isLoading));

  // console.log('bank' ,campings)
  
  // Show loading spinner when data is being fetched
  if(isLoading){
    return <LoadingSpinner />
  }
  
  // Show empty state only when not loading and no data
  if(campings.length === 0){
    return <EmptyList />
  }
  
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4 auto-rows-fr">
      {campings.map((element) => {
        return <CampingCard key={element.id} 
        camping={element}/> 
      })}
      {/* <div>campingLists</div> */}
    </section>
  )
}

export default CampingLists