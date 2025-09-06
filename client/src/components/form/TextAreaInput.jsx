import React from "react";
import { Textarea } from "../ui/textarea";

const TextAreaInput = ({ register, name, type, placeholder, errors}) => {
  const hasError = errors[name];
  
  return (
    <div className="space-y-2">
      <Textarea
        {...register(name)}
        rows={5}
        type={type} 
        placeholder={placeholder}
        className={`
          w-full px-4 py-4 rounded-xl border transition-all duration-300 
          font-medium placeholder:text-gray-400 resize-none
          ${hasError 
            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-200 bg-white hover:border-gray-300 focus:border-blue-500 focus:ring-blue-200'
          }
          focus:outline-none focus:ring-4 focus:ring-opacity-20
        `}
      />
      {hasError && (
        <div className="flex items-center gap-2 text-red-600 mt-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-medium">{hasError.message}</p>
        </div>
      )}
    </div>
  );
};

export default TextAreaInput;