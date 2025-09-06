import { Link } from "react-router"
import { Button } from "../ui/button"



const EmptyList = () => {
  return (
    <div className="mt-4 flex flex-col gap-4 items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">ไม่พบผลลัพธ์</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          ไม่พบแคมป์ปิ้งที่ตรงกับเงื่อนไขการค้นหาของคุณ ลองเปลี่ยนตัวกรองหรือคำค้นหาใหม่
        </p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors duration-200">
        <Link to='/' className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          ล้างตัวกรอง
        </Link>
      </Button>
    </div>
  )
}

export default EmptyList