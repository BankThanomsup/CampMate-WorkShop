import {
  addorRemoveFavoriteCamping,
  filterCamping,
  listCamping,
  listFavorites,
} from "@/api/camping";
import { create } from "zustand";

//Step1 Create Store

const CreateCampingStore = (set, get) => ({
  campings: [],
  favorites: [],
  center: null,
  isLoading: true, // Start with loading true
  // Helper function to sync favorites with campings
  syncCampingsWithFavorites: () => {
    const { campings, favorites } = get();
    const favoriteIds = favorites.map(fav => fav.landmark?.id || fav.landmarkId);
    
    const updatedCampings = campings.map(camping => ({
      ...camping,
      isFavorite: favoriteIds.includes(camping.id)
    }));
    
    set({ campings: updatedCampings });
  },
  actionListCamping: async (token) => {
    //code
    try {
      set({ isLoading: true });
      const res = await listCamping(token);
      // console.log('This is Zustand',res.data.result)
      set({ campings: res.data.result , center: res.data.center, isLoading: false });
      
      // Sync with existing favorites after loading campings
      const { syncCampingsWithFavorites } = get();
      syncCampingsWithFavorites();
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
  actionAddorRemoveFavorite: async (token, data) => {
    //code

    //logic
    try {
      const res = await addorRemoveFavoriteCamping(token, data);
      const camping = get().campings;
      //console.log(camping);
      const { campingId, isFavorite } = data;
      const updatedCamping = camping.map((item) => {
        return item.id === campingId
          ? { ...item, isFavorite: !isFavorite }
          : { ...item };
      });
      //   console.log("updatedCamping", updatedCamping);
      set({ campings: updatedCamping });

      //update favorite
      const favorites = get().favorites;
      if (!isFavorite) {
        // Adding to favorites - we need to fetch the full camping data for the favorite
        const addedCamping = camping.find(item => item.id === campingId);
        if (addedCamping) {
          const newFavorite = {
            profileId: null, // This would come from backend response
            landmarkId: campingId,
            landmark: { ...addedCamping, isFavorite: true }
          };
          set({ favorites: [...favorites, newFavorite] });
        }
      } else {
        // Removing from favorites
        const updatedFavorite = favorites.filter((item) => {
          return item.landmark.id !== campingId;
        });
        set({ favorites: updatedFavorite });
      }

      //   console.log(res.data.message);
      return { success: true, message: res.data.message };
    } catch (error) {
      //   console.log(error?.response?.data?.message);
      const err = error?.response?.data?.message || 'An error occurred';
      return { success: false, message: err };
    }
  },
  actionListFavorite: async (token) => {
    try {
      const res = await listFavorites(token);
      // console.log(res.data.result)
      set({ favorites: res.data.result });
      
      // Sync campings with favorites after loading favorites
      const { syncCampingsWithFavorites } = get();
      syncCampingsWithFavorites();
    } catch (error) {
      console.log(error);
    }
  },
  actionFilter: async (category = "", search = "") => {
    try {
      set({ isLoading: true });
      const res = await filterCamping(category, search);
      console.log("This is Zustand",res.data);
      set({campings:res.data.result , center: res.data.center, isLoading: false});
      
      // Sync with existing favorites after filtering
      const { syncCampingsWithFavorites } = get();
      syncCampingsWithFavorites();
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
});

const useCampingStore = create(CreateCampingStore);

//Step2 Export Store

export default useCampingStore;
