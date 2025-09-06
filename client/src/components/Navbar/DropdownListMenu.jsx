import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignLeft, Home, Info, User, Calendar, Heart, MapPin, Building, BarChart3 } from "lucide-react";
import Usericon from "./Usericon";
import { Button } from "../ui/button";
import { PublicLinks,PrivateLinks } from "@/utils/links";
import { Link } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import SignOutLink from "./SignOutLink";

// เพิ่ม icon mapping
const iconMap = {
  'Home': Home,
  'About': Info,
  'My Profile': User,
  'My Booking': Calendar,
  'My Favorite': Heart,
  'My Reservations': Calendar,
  'My Campings': MapPin,
  'Camping': Building,
  'Dashboard': BarChart3,
};

const DropdownListMenu = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="relative overflow-hidden group border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
          >
            <div className="flex items-center gap-2">
              <AlignLeft className="transition-transform duration-300 group-hover:rotate-90" />
              <Usericon />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-2">
          <DropdownMenuLabel className="text-center py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl mb-2 font-semibold text-lg shadow-md">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          
          {PublicLinks.map((item, index) => {
            const IconComponent = iconMap[item.label] || Home;
            return (
              <DropdownMenuItem key={index} asChild>
                <Link 
                  to={item.href} 
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
                >
                  <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                  <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                    {item.label}
                  </span>
                </Link>
              </DropdownMenuItem>
            );
          })}
          
          <DropdownMenuSeparator className="bg-gray-200 my-2" />
          
          <SignedOut>
            <DropdownMenuItem className="p-0">
              <SignInButton mode="modal">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group">
                  <User className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                  <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                    Login
                  </span>
                </button>
              </SignInButton>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <SignUpButton mode="modal">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-300 group">
                  <User className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" />
                  <span className="font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                    Register
                  </span>
                </button>
              </SignUpButton>
            </DropdownMenuItem>
          </SignedOut>
          
          <SignedIn>
            {PrivateLinks.map((item, index) => {
              const IconComponent = iconMap[item.label] || User;
              return (
                <DropdownMenuItem key={index} asChild>
                  <Link 
                    to={item.href} 
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
                  >
                    <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                    <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                      {item.label}
                    </span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator className="bg-gray-200 my-2" />
            <DropdownMenuItem className="p-0">
              <SignOutLink />
            </DropdownMenuItem>
          </SignedIn>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownListMenu;
