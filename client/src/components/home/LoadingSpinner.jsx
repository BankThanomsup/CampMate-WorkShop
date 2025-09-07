const LoadingSpinner = () => {
  return (
    <div className="mt-4 flex flex-col gap-4 items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {/* Spinning loading icon */}
          <svg className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">กำลังโหลดข้อมูล</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          กรุณารอสักครู่ ระบบกำลังดึงข้อมูลแคมป์ปิ้งสำหรับคุณ
        </p>
        
        {/* Optional: Additional loading dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
