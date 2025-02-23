import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import DropdownListMenu from "./DropdownListMenu";


const Navbar = () => {
  return (
    <nav>
      <div className="flex flex-col items-center py-8  justify-between  sm:flex-row gap-4">
        <Logo />
        <Searchbar />
        <DropdownListMenu />
      </div>
    </nav>
  );
};

export default Navbar;
