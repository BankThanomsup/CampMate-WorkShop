import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const FormInputs = ({ register, name, type, placeholder, errors }) => {
  const hasError = errors[name];
  
  return (
    <div className="space-y-2">
      <Input 
        {...register(name)} 
        type={type} 
        placeholder={placeholder} 
        className={`
          w-full px-4 py-4 rounded-xl border transition-all duration-300 
          font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 min-h-[56px]
          text-gray-900 dark:text-white
          ${hasError 
            ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900' 
            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900'
          }
          focus:outline-none focus:ring-4 focus:ring-opacity-20
        `}
      />
      {hasError && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mt-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-medium">{hasError.message}</p>
        </div>
      )}
    </div>
  );
};

export default FormInputs;
