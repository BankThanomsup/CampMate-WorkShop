import { useUser } from '@clerk/clerk-react';
import { Shield, AlertTriangle } from 'lucide-react';

const AdminGuard = ({ children }) => {
  const { user, isLoaded } = useUser();
  
  // Admin credentials
  const ADMIN_CLERK_ID = 'user_2vLXDdBNkHqwzieoobMt4NhLqJY';
  const ADMIN_EMAIL = 'thitikorn.thanomsup@gmail.com';
  
  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }
  
  // Check if user is admin
  const isAdmin = user?.id === ADMIN_CLERK_ID || user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              ไม่มีสิทธิ์เข้าถึง
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
              คุณไม่มีสิทธิ์เข้าถึงหน้าจัดการแคมป์ปิ้ง หน้านี้สงวนไว้สำหรับผู้ดูแลระบบเท่านั้น
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              กลับหน้าก่อนหน้า
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Admin Panel
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                จัดการแคมป์ปิ้งในระบบ
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default AdminGuard;
