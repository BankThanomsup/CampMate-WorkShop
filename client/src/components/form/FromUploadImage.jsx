import { resizeFile } from "@/utils/resizeimage";
import { Input } from "../ui/input";
import { useAuth } from "@clerk/clerk-react";
import { uploadFileImage } from "@/api/ีีuploadFileImage";
import { RotateCw, Upload, CheckCircle } from "lucide-react";
import { useState } from "react";

const FromUploadImage = ({ setValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const { getToken } = useAuth();
  
  const hdlOnChange = async (e) => {
    setIsLoading(true);
    setIsUploaded(false);
    
    const token = await getToken();
    const file = e.target.files[0];
    if (!file) {
      setIsLoading(false);
      return;
    }
    
    try {
      const resizedImage = await resizeFile(file);
      const res = await uploadFileImage(token, resizedImage);
      setValue("image", res.data.result);
      setIsUploaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Input 
          type="file" 
          onChange={hdlOnChange}
          accept="image/*"
          className="
            w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 
            bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 
            focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 
            focus:ring-blue-200 dark:focus:ring-blue-900 focus:ring-opacity-20 focus:outline-none 
            transition-all duration-300 font-medium min-h-[64px]
            file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0
            file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900/50 
            file:text-blue-700 dark:file:text-blue-300
            hover:file:bg-blue-100 dark:hover:file:bg-blue-900/70 cursor-pointer
            flex items-center text-gray-900 dark:text-white
          "
        />
        
        {/* Status Icons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          {isLoading && (
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
              <RotateCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium hidden sm:inline">กำลังอัพโหลด...</span>
            </div>
          )}
          
          {isUploaded && !isLoading && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">อัพโหลดสำเร็จ!</span>
            </div>
          )}
          
          {!isLoading && !isUploaded && (
            <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
              <Upload className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 transition-colors duration-300">
        <Upload className="w-4 h-4" />
        รองรับไฟล์: JPG, PNG, GIF (ขนาดไม่เกิน 5MB)
      </p>
    </div>
  );
};

export default FromUploadImage;
