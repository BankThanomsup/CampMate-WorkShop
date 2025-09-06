import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center w-10 h-10 
        rounded-full transition-all duration-300 ease-in-out
        hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 focus:ring-yellow-400' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600 focus:ring-blue-500'
        }
        ${className}
      `}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun 
          className={`
            absolute inset-0 w-5 h-5 transition-all duration-300
            ${isDarkMode 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`
            absolute inset-0 w-5 h-5 transition-all duration-300
            ${isDarkMode 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
