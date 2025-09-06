import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, MapPin, Users, Star } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 mb-12 rounded-2xl overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-600 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-green-600 rounded-full"></div>
        <div className="absolute bottom-32 right-16 w-14 h-14 bg-yellow-600 rounded-full"></div>
      </div>
      
      <div className="relative container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            ค้นหา
            <span className="text-gradient"> แคมป์ปิ้ง </span>
            สุดพิเศษ
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            ผจญภัยในธรรมชาติอันงดงาม พร้อมสิ่งอำนวยความสะดวกครบครัน 
            เริ่มต้นการเดินทางที่ไม่รู้ลืมของคุณ
          </p>
          
          {/* CTA Button */}
          <div className="mb-12">
            <Button 
              size="lg" 
              className="btn-primary text-lg px-8 py-4 rounded-xl group"
              onClick={() => document.getElementById('camping-list')?.scrollIntoView({ behavior: 'smooth' })}
            >
              เริ่มค้นหาเลย
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-3">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">200+</div>
              <div className="text-sm text-gray-600">สถานที่ท่องเที่ยว</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">นักท่องเที่ยวมั่นใจ</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mx-auto mb-3">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.9</div>
              <div className="text-sm text-gray-600">คะแนนรีวิวเฉลี่ย</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
