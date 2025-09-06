import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/catagories";

const CategoryInput = ({ name, register, setValue }) => {
  return (
    <div className="space-y-3">
      <input hidden {...register(name)} />
      <Select
        onValueChange={(value) => {
          setValue(name, value);
        }}
        required
      >
        <SelectTrigger className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 focus:ring-opacity-20 focus:outline-none transition-all duration-300 font-medium min-h-[64px] flex items-center text-gray-900 dark:text-white">
          <SelectValue 
            placeholder="กรุณาเลือกหมวดหมู่" 
            className="text-gray-400 dark:text-gray-500"
          />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-gray-200 dark:border-gray-600 shadow-lg bg-white dark:bg-gray-700">
          {categories.map((item) => {
            return (
              <SelectItem 
                key={item.label} 
                value={item.label}
                className="cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-600 focus:bg-blue-50 dark:focus:bg-gray-600 rounded-lg py-3 text-gray-900 dark:text-white"
              >
                <span className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <p className="capitalize font-medium">{item.label}</p>
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryInput;
