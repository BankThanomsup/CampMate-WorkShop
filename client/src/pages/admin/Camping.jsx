import FormInputs from "@/components/form/FormInputs";
import TextAreaInput from "@/components/form/TextAreaInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campingSchema } from "@/utils/schema";
import Buttons from "@/components/form/Buttons";
import CategoryInput from "@/components/form/CategoryInput";
import MainMap from "@/components/map/MainMap";
import { useAuth } from '@clerk/clerk-react'
import { createCamping } from "@/api/camping";
import FromUploadimage from "@/components/form/FromUploadImage";
import { createAlert } from "@/utils/createAlert";

const Camping = () => {
  //cleck
  const { getToken } = useAuth();

  const { register, handleSubmit,formState, setValue,reset} = useForm(
    {resolver: zodResolver(campingSchema)}
  );
  const {errors,isSubmitting} = formState;
  // console.log("Form Errors:", errors); // Debugging
  // console.log(isSubmitting)
  

  const hdlSubmit = async (data) => {
    await new Promise((resolve)=>setTimeout(resolve,1000))
    const token = await getToken()
    console.log(data);
    createCamping(token,data)
    .then((res)=>{
      // console.log(res.data);
      // reset();
      createAlert("success","Create Landmark Success",2000)
    })
    .catch((err)=>{

      console.log(err);
      createAlert("error","Register Failed",2000)
    })
  };

  return (
    <section>
      <h1 className="capitalize text-2xl font-semibold">create camping</h1>
      <div className="border p-8 rounded-md">
        <form onSubmit={handleSubmit(hdlSubmit)}>
          <div className="grid md:grid-cols-2 gap-4 mt-4 ">
            <FormInputs
              register={register}
              name="title"
              type="text"
              placeholder="Input Your Title"
              errors={errors}
            />

            <FormInputs
              register={register}
              name="price"
              type="number"
              placeholder="Input Your Price"
              errors={errors}
            />

            <TextAreaInput
              register={register}
              name="description"
              type="text"
              placeholder="Input Your Description"
              errors={errors}
            />
            <div>
              
            <CategoryInput name="category" register={register} setValue={setValue}/>
            <FromUploadimage setValue={setValue}/>
            </div>
            </div>

            <MainMap name="" register={register} setValue={setValue} />
            <Buttons text="create camping" isPending={isSubmitting} />
        </form>

      </div>
    </section>
  );
};

export default Camping;
