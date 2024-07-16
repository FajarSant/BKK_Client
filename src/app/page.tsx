import React from "react";
import Header from "./Components/Header";
import CardPost from "./Components/Cardpost";
import Topbar from "./Components/TopBar";

const page = () => {
  return (
    <div>
      <Topbar/>
      <div className=" bg-white mb-10"> 
        {/* <SearchBar /> */}
        <CardPost />
        <CardPost />
        <CardPost />
      </div>
    </div>
  );
};

export default page;
