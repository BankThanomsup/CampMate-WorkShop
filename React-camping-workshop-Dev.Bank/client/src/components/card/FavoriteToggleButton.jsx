import useCampingStore from "@/store/camping-store";
import { CardSubmitButtons } from "./CardButtons";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/clerk-react";


const FavoriteToggleButton = ({ isFavorite, campingId }) => {

    //clerk
    const { getToken } = useAuth();




    //Hook-From
    const {handleSubmit,formState} = useForm();
    const {isSubmitting} = formState;
    //code Zustand
    const actionAddorRemoveFavorite = useCampingStore((state) => state.actionAddorRemoveFavorite);


    const hdlSubmit = async() =>{
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const token = await getToken();
        // console.log(token);
        const res = await actionAddorRemoveFavorite(token,{campingId,isFavorite});

    };


    console.log(isFavorite, campingId);

  return (
    <form onSubmit={handleSubmit(hdlSubmit)}>
    <CardSubmitButtons isPending={isSubmitting} isFavorite={isFavorite}/>
    </form>
  )
}

export default FavoriteToggleButton