//rafce
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputs from "@/components/form/FormInputs";
import Buttons from "@/components/form/Buttons";
import { profileSchema } from "@/utils/schema";
import {createProfile} from "@/api/profile";

//clerk
import { useAuth } from '@clerk/clerk-react'
  //javascript




const Profile = () => {
    //cleck
    const { getToken } = useAuth()
    const { register, handleSubmit,formState} = useForm(
      {resolver: zodResolver(profileSchema)}
    );
    const {errors,isSubmitting} = formState;


    const BankSubmit = async (data) => {
      //code body
      const token = await getToken()
      createProfile(token,data)
      .then((res)=>{
        // console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    };




  return (
    <section >
      <h1 className="capitalize text-2xl font-semibold">create camping</h1>
      <div className="border p-8 rounded-md">
        <form onSubmit={handleSubmit(BankSubmit)}>
          <div className=" grid md:grid-cols-2 gap-4 mt-4">
            <FormInputs register={register} name="firstname" type="text" placeholder="Input your first name" errors={errors}/>
            <FormInputs register={register} name="lastname" type="text" placeholder="Input your last name" errors={errors}/>
            <Buttons text="Create Profile" isPending={isSubmitting} />
          </div>
        </form>
      </div>
      
    </section>
  )
}

export default Profile