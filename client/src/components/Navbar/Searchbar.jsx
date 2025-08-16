import React from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";


const Searchbar = () => {
  //js
  const[searchParams, setSearchParams] = useSearchParams();
  const updateSearch = useDebouncedCallback( (value) =>{
      console.log(value)
    const params = new URLSearchParams(searchParams)
    if(value){
      params.set('search',value)
    }else{
      params.delete('search')
    }

    setSearchParams(params);
  },500);
  
  const hdlSearch = (e) => {
    // console.log(e.target.value)
    updateSearch(e.target.value)
  }




  return (
    <div>
      <Input onChange={hdlSearch} type="text" placeholder="Search..." className="max-w-xs" />
    </div>
  );
};

export default Searchbar;
