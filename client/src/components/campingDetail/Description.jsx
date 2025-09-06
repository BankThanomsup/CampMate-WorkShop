import React from "react";

const Description = ({ text, camping }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📝</span>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">รายละเอียด</h2>
      </div>
      
      {/* Price Info */}
      {camping?.pricePerNight && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💰</span>
            <h3 className="font-medium text-green-800 dark:text-green-300 transition-colors duration-300">ราคา</h3>
          </div>
          <p className="text-green-700 dark:text-green-400 font-semibold text-xl transition-colors duration-300">
            ฿{camping.pricePerNight?.toLocaleString()} <span className="text-sm font-normal">/ คืน</span>
          </p>
        </div>
      )}

      {/* Location Info */}
      {camping?.lat && camping?.lng && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📍</span>
            <h3 className="font-medium text-blue-800 dark:text-blue-300 transition-colors duration-300">ตำแหน่งที่ตั้ง</h3>
          </div>
          <p className="text-blue-700 dark:text-blue-400 text-sm leading-relaxed transition-colors duration-300">
            พิกัด: {camping.lat?.toFixed(6)}, {camping.lng?.toFixed(6)}
          </p>
        </div>
      )}
      
      {/* Description */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
          {text || 'ไม่มีรายละเอียดเพิ่มเติม'}
        </div>
      </div>
    </div>
  );
};

export default Description;
