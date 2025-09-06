import React from "react";
import { SignOutButton } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

const SignOutLink = () => {
  const { toast } = useToast();
  const handleLogout = () => {
    //code body
    toast({ description: "Logout Successfully" });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button 
        onClick={handleLogout}
        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 transition-all duration-300 group"
      >
        <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300" />
        <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
          Logout
        </span>
      </button>
    </SignOutButton>
  );
};

export default SignOutLink;
