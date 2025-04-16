import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const FormInputs = ({ register, name, type, placeholder,errors }) => {
 // ||  first true last false , && first false
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>
      <Input {...register(name)} type={type} placeholder={placeholder} className={`${errors[name] && "border-red-500"}`}/>
    {
      errors[name] && (<p className="text-red-500 text-sm">{errors[name].message}</p>)
    }
    
    </div>
  );
};

export default FormInputs;
