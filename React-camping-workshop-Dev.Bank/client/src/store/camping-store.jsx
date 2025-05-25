import { addorRemoveFavoriteCamping, listCamping } from "@/api/camping";
import { create } from "zustand";

//Step1 Create Store

const CreateCampingStore = (set,get) => ({
  campings: [],
  actionListCamping: async (id) => {
    //code
    try {
      const res = await listCamping(id);
      // console.log('This is Zustand',res.data.result)
      set({ campings: res.data.result });
    } catch (error) {
      console.log(error);
    }
  },
  actionAddorRemoveFavorite: async (token, data) => {
    //code

    //logic
    try {
      const res = await addorRemoveFavoriteCamping(token, data);
      const camping = get().campings
      //console.log(camping);
      const {campingId , isFavorite} = data;
      const updatedCamping = camping.map((item)=>{
        return item.id === campingId 
        ?{...item,isFavorite: !isFavorite}
        :{...item}
      })
    //   console.log("updatedCamping", updatedCamping);
      set({campings: updatedCamping});
    //   console.log(res.data.message);
      return {success: true, message: res.data.message};


    } catch (error) {
    //   console.log(error?.response?.data?.message);
      const err = error?.response?.data?.message
      return { success: false, message: err };
    }
  },
});

const useCampingStore = create(CreateCampingStore);

//Step2 Export Store

export default useCampingStore;
