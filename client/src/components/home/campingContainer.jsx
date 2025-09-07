import useCampingStore from "@/store/camping-store";
import MapHome from "../map/MapHome";
import CampingLists from "./campingLists";
import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import CategoryLists from "./CategoryLists";
import { useSearchParams } from "react-router";

const campingContainer = () => {
  const actionListCamping = useCampingStore((state) => state.actionListCamping);
  const actionListFavorite = useCampingStore((state) => state.actionListFavorite);
  const actionFilter = useCampingStore((state) => state.actionFilter);
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

  //clerk
  const { user } = useUser();
  const { getToken, isSignedIn } = useAuth();
  const id = user?.id ?? null;

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load favorites first if user is signed in
        if (isSignedIn) {
          const token = await getToken();
          await actionListFavorite(token);
        }
        
        // Then load camping data
        if (search || category) {
          await actionFilter(category, search);
        } else if (!search && !category) {
          if (isSignedIn) {
            const token = await getToken();
            await actionListCamping(token);
          } else {
            await actionListCamping(null);
          }
        }
        
        setHasInitiallyLoaded(true);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    if (!hasInitiallyLoaded || search || category) {
      loadData();
    }
  }, [search, category, isSignedIn, hasInitiallyLoaded]);

  return (
    <div className="space-y-8">
      <CategoryLists />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <MapHome />
      </div>
      <div id="camping-list">
        <CampingLists />
      </div>
    </div>
  );
};

export default campingContainer;
