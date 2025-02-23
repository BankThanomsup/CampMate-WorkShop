import React from "react";
import { Input } from "../ui/input";

const Searchbar = () => {
  return (
    <div>
      <Input type="text" placeholder="Search..." className="max-w-xs" />
    </div>
  );
};

export default Searchbar;
