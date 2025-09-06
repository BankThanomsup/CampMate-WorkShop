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

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  
  useEffect(() => {
    if (search || category) {
      actionFilter(category, search);
    } else if (!search && !category) {
      actionListCamping(id);
    }
  }, [search, category]);

  return (
    <div className="space-y-8">
      <CategoryLists />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <MapHome />
      </div>
      <div id="camping-list">
        <CampingLists />
      </div>
    </div>
  );
};

export default campingContainer;
