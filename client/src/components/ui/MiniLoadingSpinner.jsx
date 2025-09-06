import React from 'react';
import { Loader2, Package } from 'lucide-react';

const MiniLoadingSpinner = ({ 
  title = "กำลังโหลด...", 
  description = "โปรดรอสักครู่", 
  size = "medium" 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'py-8',
          spinner: 'w-8 h-8',
          title: 'text-lg',
          description: 'text-xs'
        };
      case 'large':
        return {
          container: 'py-16',
          spinner: 'w-16 h-16',
          title: 'text-2xl',
          description: 'text-base'
        };
      default: // medium
        return {
          container: 'py-12',
          spinner: 'w-12 h-12',
          title: 'text-xl',
          description: 'text-sm'
        };
    }
  };

  const classes = getSizeClasses();

  return (
    <div className={`flex flex-col items-center justify-center ${classes.container} bg-gray-50 rounded-lg border border-gray-200`}>
      {/* Spinner Container */}
      <div className="relative mb-4">
        {/* Outer Ring */}
        <div className={`${classes.spinner} border-4 border-gray-200 rounded-full relative`}>
          {/* Inner Animated Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Pulse Effect */}
        <div className={`absolute inset-0 ${classes.spinner} rounded-full bg-blue-100 opacity-20 animate-ping`}></div>
      </div>

      {/* Title */}
      <h3 className={`font-semibold mb-1 text-gray-800 ${classes.title}`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`text-gray-600 text-center max-w-sm ${classes.description}`}>
        {description}
      </p>

      {/* Progress Dots */}
      <div className="flex justify-center space-x-1 mt-3">
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default MiniLoadingSpinner;
