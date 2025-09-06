//rafce
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputs from "@/components/form/FormInputs";
import Buttons from "@/components/form/Buttons";
import { profileSchema } from "@/utils/schema";
import {createProfile} from "@/api/profile";
import FromUploadimage from "@/components/form/FromUploadImage";
import { createAlert } from "@/utils/createAlert";
import Confetti from "@/components/ui/Confetti";
import { User, UserCheck, Sparkles } from "lucide-react";
import { useState } from "react";
//clerk
import { useAuth } from '@clerk/clerk-react'

const Profile = () => {
    //cleck
    const { getToken } = useAuth()
    const [showConfetti, setShowConfetti] = useState(false);
    
    const { register, handleSubmit,formState, reset} = useForm(
      {resolver: zodResolver(profileSchema)}
    );
    const {errors,isSubmitting} = formState;

    const BankSubmit = async (data) => {
      //code body
      const token = await getToken()
      createProfile(token,data)
      .then((res)=>{
        // console.log(res.data);
        reset(); // ล้างฟอร์มหลังจากสำเร็จ
        createAlert("success","🎉 สร้าง Profile สำเร็จ! ยินดีด้วย!",3000)
        // เปิดแอนิเมชั่นพลุ
        setShowConfetti(true);
      })
      .catch((err)=>{
        console.log(err);
      })
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      {/* แอนิเมชั่นพลุ */}
      <Confetti 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create Your Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's set up your profile to get started with CampMate. Tell us a bit about yourself.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="card-professional max-w-2xl mx-auto">
          <div className="p-8">
            {/* Form Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <p className="text-sm text-gray-500">Please provide your basic information</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(BankSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    First Name
                  </label>
                  <FormInputs 
                    register={register} 
                    name="firstname" 
                    type="text" 
                    placeholder="Enter your first name" 
                    errors={errors}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Last Name
                  </label>
                  <FormInputs 
                    register={register} 
                    name="lastname" 
                    type="text" 
                    placeholder="Enter your last name" 
                    errors={errors}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-100">
                <Buttons 
                  text={isSubmitting ? "Creating Profile..." : "Create Profile"} 
                  isPending={isSubmitting} 
                />
              </div>
            </form>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Your information is secure and will only be used to enhance your camping experience.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile