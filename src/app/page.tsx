import React from "react";
import NavigasiBar from "./Components/NavigasiBar";
import SearchBar from "./Components/SearchBar";
import Header from "./Components/Header";
import CardPost from "./Components/Cardpost";

const page = () => {
  return (
    <div>
      <NavigasiBar />
      <div className="mt-32"> 
        {/* <SearchBar /> */}
        <Header />
        <CardPost />
      </div>
    </div>
  );
};

export default page;
