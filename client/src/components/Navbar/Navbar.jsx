import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import DropdownListMenu from "./DropdownListMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
      <div className="flex flex-col items-center py-6 justify-between sm:flex-row gap-4">
        <Logo />
        <div className="flex-1 max-w-md">
          <Searchbar />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <DropdownListMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
