import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import DropdownListMenu from "./DropdownListMenu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="flex flex-col items-center py-6 justify-between sm:flex-row gap-4">
        <Logo />
        <div className="flex-1 max-w-md">
          <Searchbar />
        </div>
        <DropdownListMenu />
      </div>
    </nav>
  );
};

export default Navbar;
