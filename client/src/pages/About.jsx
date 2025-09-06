

import React from 'react'
import { Button } from '@/components/ui/button'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight transition-colors duration-300">
              About Us
            </h1>
            
            <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium transition-colors duration-300">
              แพลตฟอร์มจองแคมปิ้งที่ทำให้การเดินทางของคุณง่ายขึ้น
            </h2>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              <p>
                CampMate เกิดขึ้นจากความรักในธรรมชาติและความต้องการที่จะทำให้การแคมปิ้ง
                เป็นเรื่องง่ายสำหรับทุกคน เราเชื่อว่าทุกคนควรได้สัมผัสกับความงามของธรรมชาติ
              </p>
              
              <p>
                ด้วยระบบจองที่ใช้งานง่าย รวบรวมสถานที่แคมปิ้งคุณภาพทั่วประเทศไทย 
                พร้อมข้อมูลละเอียดและรีวิวจากผู้ใช้งานจริง เพื่อให้คุณวางแผนการเดินทางได้อย่างมั่นใจ
              </p>
              
              <p>
                เราพัฒนาแพลตฟอร์มนี้ขึ้นมาตั้งแต่ปี 2024 และได้รับความไว้วางใจจากแคมเปอร์
                มากกว่า 10,000 คนแล้ว มาร่วมสร้างประสบการณ์สวยๆ ไปด้วยกัน
              </p>
            </div>
            
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300"
                onClick={() => window.location.href = '/'}
              >
                เริ่มต้นจองเลย
              </Button>
            </div>
          </div>
          
          {/* Right Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-teal-400 to-cyan-500 dark:from-teal-500 dark:to-cyan-600 rounded-2xl p-6 h-48 flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <div className="text-center text-white">
                    <div className="text-3xl mb-2">🏕️</div>
                    <p className="text-sm font-medium">แคมปิ้งริมทะเล</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 rounded-2xl p-6 h-32 flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <div className="text-center text-white">
                    <div className="text-2xl mb-1">🌲</div>
                    <p className="text-xs font-medium">ป่าเขา</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 dark:from-orange-500 dark:to-red-600 rounded-2xl p-6 h-32 flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <div className="text-center text-white">
                    <div className="text-2xl mb-1">⭐</div>
                    <p className="text-xs font-medium">รีวิวจริง</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 rounded-2xl p-6 h-48 flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <div className="text-center text-white">
                    <div className="text-3xl mb-2">🗺️</div>
                    <p className="text-sm font-medium">แผนที่ละเอียด</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-200 dark:bg-purple-800/30 rounded-full opacity-50 transition-colors duration-300"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-200 dark:bg-blue-800/30 rounded-full opacity-30 transition-colors duration-300"></div>
          </div>
          
        </div>
        
        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:scale-105">
            <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 transition-colors duration-300">🏞️</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">สถานที่แคมปิ้งมากมาย</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:scale-105">
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-300">⚡</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">การจองที่รวดเร็ว</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:scale-105">
            <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2 transition-colors duration-300">✅</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">ตรวจสอบความถูกต้องการจอง</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About