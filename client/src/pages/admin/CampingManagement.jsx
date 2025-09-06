import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import AdminGuard from '@/components/admin/AdminGuard';
import { listCamping, deleteCamping } from '@/api/camping';
import { createAlert } from '@/utils/createAlert';
import { Pencil, Trash2, Plus, MapPin, Eye, Calendar, Shield } from 'lucide-react';
import { Link } from 'react-router';

const CampingManagement = () => {
  const { getToken } = useAuth();
  const [campings, setCampings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchCampings();
  }, []);

  const fetchCampings = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await listCamping(token);
      setCampings(response.data.result || []);
    } catch (error) {
      console.error('Error fetching campings:', error);
      createAlert('error', 'ไม่สามารถโหลดข้อมูลแคมป์ปิ้งได้');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (campingId, campingName) => {
    if (!window.confirm(`คุณต้องการลบแคมป์ปิ้ง "${campingName}" หรือไม่?\n\nการดำเนินการนี้ไม่สามารถยกเลิกได้!`)) {
      return;
    }

    try {
      setDeleteLoading(campingId);
      const token = await getToken();
      const response = await deleteCamping(token, campingId);
      
      console.log('Delete response:', response); // เพื่อ debug
      
      // Remove from state
      setCampings(prev => prev.filter(camping => camping.id !== campingId));
      
      // แสดงข้อความสำเร็จจาก backend หรือใช้ข้อความเริ่มต้น
      const successMessage = response.data?.message || `ลบแคมป์ปิ้ง "${campingName}" สำเร็จ`;
      createAlert('success', successMessage);
      
    } catch (error) {
      console.error('Error deleting camping:', error);
      
      // แสดงข้อความ error ที่เฉพาะเจาะจงจาก backend
      const errorMessage = error.response?.data?.message || 'ไม่สามารถลบแคมป์ปิ้งได้ กรุณาลองใหม่อีกครั้ง';
      createAlert('error', errorMessage);
      
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <AdminGuard>
      <div className="space-y-6">
        {/* Admin Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Admin Panel
              </h1>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                จัดการแคมป์ปิ้งในระบบ
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              จัดการแคมป์ปิ้ง
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-300">
              แก้ไขและลบข้อมูลแคมป์ปิ้งในระบบ
            </p>
          </div>
          
          <Link 
            to="/admin/camping/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            เพิ่มแคมป์ปิ้งใหม่
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">จำนวนแคมป์ปิ้งทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{campings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">แคมป์ปิ้งที่เปิดให้บริการ</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{campings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">อัพเดทล่าสุด</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">วันนี้</p>
              </div>
            </div>
          </div>
        </div>

        {/* Camping List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
              รายการแคมป์ปิ้ง
            </h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">กำลังโหลด...</p>
            </div>
          ) : campings.length === 0 ? (
            <div className="p-8 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">ยังไม่มีแคมป์ปิ้งในระบบ</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      รูปภาพ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ชื่อแคมป์ปิ้ง
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ราคา/คืน
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ตำแหน่ง
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      การจัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {campings.map((camping) => (
                    <tr key={camping.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img 
                          src={camping.secure_url} 
                          alt={camping.title}
                          className="w-16 h-16 object-cover rounded-lg shadow-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                          {camping.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                          {camping.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                          ฿{camping.price?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {camping.lat?.toFixed(2)}, {camping.lng?.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/user/camping/${camping.id}`}
                            className="inline-flex items-center justify-center w-8 h-8 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                            title="ดูรายละเอียด"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          
                          <Link
                            to={`/admin/camping/edit/${camping.id}`}
                            className="inline-flex items-center justify-center w-8 h-8 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors duration-200"
                            title="แก้ไข"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          
                          <button
                            onClick={() => handleDelete(camping.id, camping.title)}
                            disabled={deleteLoading === camping.id}
                            className="inline-flex items-center justify-center w-8 h-8 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            title="ลบ"
                          >
                            {deleteLoading === camping.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
};

export default CampingManagement;
