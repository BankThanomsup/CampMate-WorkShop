import { addorRemoveFavoriteCamping, listCamping } from "@/api/camping";
import { create } from "zustand";


//Step1 Create Store

const CreateCampingStore = (set) => ({
    campings:[],
    actionListCamping : async(id) =>{
        //code
        try {
            const res = await listCamping(id)
            // console.log('This is Zustand',res.data.result)
            set({campings:res.data.result})
        } catch (error) {
            console.log(error);
            
        }
    },
    actionAddorRemoveFavorite : async (token,data) =>{
        //code
        const res =await addorRemoveFavoriteCamping(token,data);
        console.log(res);
    }
})

const useCampingStore = create(CreateCampingStore)


//Step2 Export Store

export default useCampingStore;