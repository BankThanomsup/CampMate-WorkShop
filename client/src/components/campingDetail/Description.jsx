import React from "react";

const Description = ({ text, camping }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📝</span>
        <h2 className="text-2xl font-semibold text-gray-900">รายละเอียด</h2>
      </div>
      
      {/* Price Info */}
      {camping?.pricePerNight && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💰</span>
            <h3 className="font-medium text-green-800">ราคา</h3>
          </div>
          <p className="text-green-700 font-semibold text-xl">
            ฿{camping.pricePerNight?.toLocaleString()} <span className="text-sm font-normal">/ คืน</span>
          </p>
        </div>
      )}

      {/* Location Info */}
      {camping?.lat && camping?.lng && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📍</span>
            <h3 className="font-medium text-blue-800">ตำแหน่งที่ตั้ง</h3>
          </div>
          <p className="text-blue-700 text-sm leading-relaxed">
            พิกัด: {camping.lat?.toFixed(6)}, {camping.lng?.toFixed(6)}
          </p>
        </div>
      )}
      
      {/* Description */}
      <div className="prose prose-gray max-w-none">
        <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-200">
          {text || 'ไม่มีรายละเอียดเพิ่มเติม'}
        </div>
      </div>
    </div>
  );
};

export default Description;
