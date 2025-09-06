import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import AdminGuard from '@/components/admin/AdminGuard';
import { readCamping, updateCamping } from '@/api/camping';
import { createAlert } from '@/utils/createAlert';
import { Shield, Save, ArrowLeft, MapPin, Camera, FileText, Image, Tag, Map, Tent, DollarSign } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { campingSchema } from '@/utils/schema';
import FormInputs from '@/components/form/FormInputs';
import CategoryInput from '@/components/form/CategoryInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import FromUploadImage from '@/components/form/FromUploadImage';
import MainMap from '@/components/map/MainMap';
import { Button } from '@/components/ui/button';

const EditCamping = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [camping, setCamping] = useState(null);

  const { register, handleSubmit, formState, reset, setValue, watch } = useForm({
    resolver: zodResolver(campingSchema)
  });
  const { errors, isSubmitting } = formState;

  // เก็บข้อมูลตำแหน่งสำหรับแผนที่
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetchCampingData();
  }, [id]);

  const fetchCampingData = async () => {
    try {
      setLoading(true);
      const response = await readCamping(id);
      const campingData = response.data.result;
      setCamping(campingData);
      
      // ตั้งค่าข้อมูลเริ่มต้นในฟอร์ม
      reset({
        title: campingData.title,
        price: campingData.price,
        description: campingData.description,
        category: campingData.category,
        lat: campingData.lat,
        lng: campingData.lng,
      });
      
      // ตั้งค่าตำแหน่งสำหรับแผนที่
      if (campingData.lat && campingData.lng) {
        setCurrentLocation([campingData.lat, campingData.lng]);
      }
      
    } catch (error) {
      console.error('Error fetching camping:', error);
      createAlert('error', 'ไม่สามารถโหลดข้อมูลแคมป์ปิ้งได้');
      navigate('/admin/camping-management');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCamping = async (data) => {
    try {
      setSubmitLoading(true);
      const token = await getToken();
      
      const updateData = {
        title: data.title,
        price: Number(data.price),
        description: data.description,
        category: data.category,
        lat: Number(data.lat),
        lng: Number(data.lng),
      };

      // ถ้ามีรูปภาพใหม่ ให้เพิ่มเข้าไป
      if (data.image) {
        updateData.image = data.image;
      }

      const response = await updateCamping(token, id, updateData);
      
      createAlert('success', 'อัพเดทแคมป์ปิ้งสำเร็จ');
      navigate('/admin/camping-management');
      
    } catch (error) {
      console.error('Error updating camping:', error);
      const errorMessage = error.response?.data?.message || 'ไม่สามารถอัพเดทแคมป์ปิ้งได้';
      createAlert('error', errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </AdminGuard>
    );
  }

  if (!camping) {
    return (
      <AdminGuard>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ไม่พบแคมป์ปิ้งที่ต้องการแก้ไข
          </h1>
          <Button onClick={() => navigate('/admin/camping-management')}>
            กลับไปหน้าจัดการ
          </Button>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500 rounded-full mb-4 shadow-lg transition-all duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              แก้ไขข้อมูลแคมป์ปิ้ง
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              แก้ไขข้อมูลสถานที่แคมป์ปิ้ง: {camping?.title}
            </p>
            
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/camping-management')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                กลับไปหน้าจัดการ
              </Button>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
            <div className="p-8">
              <form onSubmit={handleSubmit(handleUpdateCamping)} className="space-y-12">
                
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">ข้อมูลพื้นฐาน</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">ข้อมูลสำคัญเกี่ยวกับสถานที่แคมป์ปิ้งของคุณ</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                        <Tent className="w-4 h-4 text-green-500 dark:text-green-400" />
                        ชื่อแคมป์ปิ้ง
                      </label>
                      <FormInputs
                        register={register}
                        name="title"
                        type="text"
                        placeholder="ชื่อแคมป์ปิ้ง"
                        errors={errors}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                        <DollarSign className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                        ราคาต่อคืน (฿)
                      </label>
                      <FormInputs
                        register={register}
                        name="price"
                        type="number"
                        placeholder="ราคาต่อคืน"
                        errors={errors}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                      <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      คำอธิบาย
                    </label>
                    <TextAreaInput
                      register={register}
                      name="description"
                      type="text"
                      placeholder="อธิบายเกี่ยวกับแคมป์ปิ้ง..."
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
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">หมวดหมู่และรูปภาพ</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">จัดหมวดหมู่สถานที่และเพิ่มรูปภาพ</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                        <Tag className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                        หมวดหมู่
                      </label>
                      <CategoryInput name="category" register={register} setValue={setValue}/>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors duration-300">
                        <Image className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                        รูปภาพปัจจุบัน / อัพโหลดใหม่
                      </label>
                      
                      {/* แสดงรูปภาพปัจจุบัน */}
                      {camping?.secure_url && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">รูปภาพปัจจุบัน:</p>
                          <img 
                            src={camping.secure_url} 
                            alt={camping.title}
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                          />
                        </div>
                      )}
                      
                      {/* อัพโหลดรูปใหม่ */}
                      <FromUploadImage setValue={setValue}/>
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
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">ตำแหน่งที่ตั้ง</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">กดเลือกตำแหน่งบนแผนที่ หรือใช้ตำแหน่งปัจจุบัน</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 transition-colors duration-300">
                    <MainMap 
                      name="" 
                      register={register} 
                      setValue={setValue} 
                      showSearch={true} 
                      location={currentLocation}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex items-center gap-4">
                    <Button
                      type="submit"
                      disabled={submitLoading}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                    >
                      {submitLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>กำลังบันทึก...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Save className="w-4 h-4" />
                          <span>บันทึกการแก้ไข</span>
                        </div>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/admin/camping-management')}
                      disabled={submitLoading}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              ข้อมูลที่ไม่ได้แก้ไขจะยังคงเป็นค่าเดิม • อัพโหลดรูปภาพใหม่เฉพาะเมื่อต้องการเปลี่ยนเท่านั้น
            </p>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
};

export default EditCamping;
