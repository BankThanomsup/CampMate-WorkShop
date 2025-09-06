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
import Confetti from "@/components/ui/Confetti";
import { Tent, MapPin, DollarSign, FileText, Image, Tag, Map } from "lucide-react";
import { useState } from "react";

const Camping = () => {
  //cleck
  const { getToken } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);

  const { register, handleSubmit,formState, setValue,reset} = useForm(
    {resolver: zodResolver(campingSchema)}
  );
  const {errors,isSubmitting} = formState;

  const hdlSubmit = async (data) => {
    console.log("Form data before submit:", data);
    
    // Validate image
    if (!data.image) {
      createAlert("error", "กรุณาอัพโหลดรูปภาพก่อน", 2000);
      return;
    }
    
    await new Promise((resolve)=>setTimeout(resolve,1000))
    const token = await getToken()
    
    createCamping(token,data)
    .then((res)=>{
      console.log("Success response:", res.data);
      reset();
      createAlert("success","🎉 สร้าง Camping Site สำเร็จ! ยินดีด้วย!",3000);
      // เปิดแอนิเมชั่นพลุ
      setShowConfetti(true);
    })
    .catch((err)=>{
      console.error("Error response:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Register Failed";
      createAlert("error", errorMessage, 2000)
    })
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      {/* แอนิเมชั่นพลุ */}
      <Confetti 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 rounded-full mb-4 shadow-lg transition-all duration-300">
            <Tent className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            Create New Camping Site
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            เพิ่มสถานที่แคมป์ปิ้งใหม่ กรอกข้อมูลให้ครบถ้วนเพื่อสร้างประสบการณ์แคมป์ปิ้งที่ยอดเยี่ยม
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
          <div className="p-8">
            <form onSubmit={handleSubmit(hdlSubmit)} className="space-y-12">
              
              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Basic information</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">ข้อมูลสำคัญเกี่ยวกับสถานที่แคมป์ปิ้งของคุณ</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                      <Tent className="w-4 h-4 text-green-500 dark:text-green-400" />
                      Camping Site Title
                    </label>
                    <FormInputs
                      register={register}
                      name="title"
                      type="text"
                      placeholder="Enter camping site name"
                      errors={errors}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                      <DollarSign className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                      Price per Night (฿)
                    </label>
                    <FormInputs
                      register={register}
                      name="price"
                      type="number"
                      placeholder="Enter price in Thai Baht"
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                    <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    Description
                  </label>
                  <TextAreaInput
                    register={register}
                    name="description"
                    type="text"
                    placeholder="Describe your camping site, amenities, and what makes it special..."
                    errors={errors}
                  />
                </div>
              </div>

              {/* Category and Media Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Category and images</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">จัดหมวดหมู่สถานที่และเพิ่มรูปภาพ</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                      <Tag className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                      Category
                    </label>
                    <CategoryInput name="category" register={register} setValue={setValue}/>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                      <Image className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                      Upload Images
                    </label>
                    <FromUploadimage setValue={setValue}/>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Location</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">กดเลือกตำแหน่งบนแผนที่</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 transition-colors duration-300">
                  <MainMap name="" register={register} setValue={setValue} showSearch={true} />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <Buttons 
                  text={isSubmitting ? "Creating Camping Site..." : "Create Camping Site"} 
                  isPending={isSubmitting} 
                />
              </div>
            </form>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            ตรวจสอบข้อมูลให้ถูกต้องก่อนส่ง สามารถแก้ไขรายละเอียดเหล่านี้ได้ภายหลัง
          </p>
        </div>
      </div>
    </div>
  );
};

export default Camping;
