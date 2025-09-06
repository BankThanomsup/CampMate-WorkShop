import React from 'react';
import { Loader2, CreditCard, CheckCircle2, Clock } from 'lucide-react';

const LoadingSpinner = ({ 
  title = "กำลังประมวลผล...", 
  description = "โปรดรอสักครู่", 
  type = "default" 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-8 h-8 text-blue-600" />;
      case 'success':
        return <CheckCircle2 className="w-8 h-8 text-green-600" />;
      case 'processing':
        return <Clock className="w-8 h-8 text-orange-600" />;
      default:
        return <Loader2 className="w-8 h-8 text-blue-600" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'payment':
        return {
          gradient: 'from-blue-50 via-white to-indigo-50',
          ring: 'border-blue-200',
          text: 'text-blue-800',
          subtext: 'text-blue-600'
        };
      case 'success':
        return {
          gradient: 'from-green-50 via-white to-emerald-50',
          ring: 'border-green-200',
          text: 'text-green-800',
          subtext: 'text-green-600'
        };
      case 'processing':
        return {
          gradient: 'from-orange-50 via-white to-amber-50',
          ring: 'border-orange-200',
          text: 'text-orange-800',
          subtext: 'text-orange-600'
        };
      default:
        return {
          gradient: 'from-blue-50 via-white to-purple-50',
          ring: 'border-blue-200',
          text: 'text-blue-800',
          subtext: 'text-blue-600'
        };
    }
  };

  const colors = getColors();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} flex items-center justify-center p-4`}>
      <div className="text-center">
        {/* Main Loading Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
          {/* Spinner Container */}
          <div className="relative mb-6">
            {/* Outer Ring */}
            <div className={`w-20 h-20 border-4 ${colors.ring} rounded-full mx-auto relative`}>
              {/* Inner Animated Ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
              
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {type === 'default' ? (
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                ) : (
                  getIcon()
                )}
              </div>
            </div>

            {/* Pulse Effect */}
            <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-blue-100 opacity-20 animate-ping"></div>
          </div>

          {/* Title */}
          <h2 className={`text-xl font-semibold mb-2 ${colors.text}`}>
            {title}
          </h2>

          {/* Description */}
          <p className={`text-sm ${colors.subtext} mb-4`}>
            {description}
          </p>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            หากคุณรอนานเกินไป โปรดรีเฟรชหน้าเว็บ
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
