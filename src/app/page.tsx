import React from "react";
import Header from "./Components/Header";
import CardPost from "./Components/Cardpost";
import Topbar from "./Components/TopBar";

const page = () => {
  return (
    <div>
      <Topbar/>
      <div className="mt-32"> 
        {/* <SearchBar /> */}
        <Header />
        <CardPost />
        <CardPost />
        <CardPost />
      </div>
    </div>
  );
};

export default page;
