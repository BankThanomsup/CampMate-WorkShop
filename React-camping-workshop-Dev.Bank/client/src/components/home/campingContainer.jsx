import useCampingStore from "@/store/camping-store";
import MapHome from "../map/MapHome";
import CampingLists from "./campingLists";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import CategoryLists from "./CategoryLists";
import { useSearchParams } from "react-router";
const campingContainer = () => {
  const actionListCamping = useCampingStore((state) => state.actionListCamping);
  const actionFilter = useCampingStore((state) => state.actionFilter);
  const [searchParams, setSearchParams] = useSearchParams();

  //clerk
  const { user } = useUser();
  const id = user?.id ?? null;
  // useEffect(()=>{

  //   // || find first true
  //   // && find first false
  //   // ?? nullish null or undefined --> right

  //   // console.log("id", id)

  // },[user?.id])

  // console.log("campingContainer",actionListCamping)
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  useEffect(() => {
    // console.log("are you ready")
    // console.log(category,search)
    if (search || category) {
      actionFilter(category, search);
    } else if (!search && !category) {
      actionListCamping(id);
    }
  }, [search, category]);

  return (
    <div>
      <CategoryLists />
      <MapHome />
      <CampingLists />
    </div>
  );
};

export default campingContainer;
