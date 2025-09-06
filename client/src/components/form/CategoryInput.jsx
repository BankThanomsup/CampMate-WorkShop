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
        <SelectTrigger className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:ring-opacity-20 focus:outline-none transition-all duration-300 font-medium min-h-[64px] flex items-center">
          <SelectValue 
            placeholder="กรุณาเลือกหมวดหมู่" 
            className="text-gray-400"
          />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-gray-200 shadow-lg">
          {categories.map((item) => {
            return (
              <SelectItem 
                key={item.label} 
                value={item.label}
                className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 rounded-lg py-3"
              >
                <span className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
