import useCampingStore from "@/store/camping-store";
import { CardSignInButtons, CardSubmitButtons } from "./CardButtons";
import { useForm } from "react-hook-form";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createNotify } from "@/utils/createAlert";


const FavoriteToggleButton = ({ isFavorite, campingId }) => {

    //clerk
    const { getToken,isSignedIn } = useAuth();
    // const {user} = useUser();
    //Hook-From
    const {handleSubmit,formState} = useForm();
    const {isSubmitting} = formState;
 

    //code Zustand


    const actionAddorRemoveFavorite = useCampingStore((state) => state.actionAddorRemoveFavorite);
    // const actionListCamping = useCampingStore((state) => state.actionListCamping);



    const hdlSubmit = async() =>{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const token = await getToken();
        // console.log(token);
        const res = await actionAddorRemoveFavorite(token,{campingId,isFavorite});
        // actionListCamping(user.id);
      if(res.success){
        createNotify('success',res.message);

      }
      else{
        createNotify('error',res.message);
      }
    };


    // console.log(isFavorite, campingId);
    if(!isSignedIn){
      return < CardSignInButtons />
    }
  return (
    <form onSubmit={handleSubmit(hdlSubmit)}>
    <CardSubmitButtons isPending={isSubmitting} isFavorite={isFavorite}/>
    </form>
  )
}

export default FavoriteToggleButton