import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import { Mountain } from 'lucide-react'

const Logo = () => {
  return (
    <Button asChild variant="ghost" className="hover:bg-transparent p-0">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
          <Mountain className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xl font-bold text-gradient">CampMate</span>
          <span className="text-xs text-gray-500 -mt-1">ค้นหาแคมป์ปิ้งสุดพิเศษ</span>
        </div>
      </Link>
    </Button>
  )
}

export default Logo