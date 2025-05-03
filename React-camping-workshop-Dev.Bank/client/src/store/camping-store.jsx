import { listCamping } from "@/api/camping";
import { create } from "zustand";


//Step1 Create Store

const CreateCampingStore = (set) => ({
    campings:[],
    actionListCamping : async() =>{
        //code
        try {
            const res = await listCamping()
            console.log(res.data.result)
            set({campings:res.data.result})
        } catch (error) {
            console.log(error);
            
        }
    }
})

const useCampingStore = create(CreateCampingStore)


//Step2 Export Store

export default useCampingStore;