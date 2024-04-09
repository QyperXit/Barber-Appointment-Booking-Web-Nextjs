import React from "react";
import CatergoryList from "./_components/CatergoryList";

const layout = ({ children }) => {
  return (
    <div className=" grid grid-cols-4">
      <div className="hidden md:block">
        <CatergoryList />
      </div>

      <div className=" ml-5 mt-[-7px] col-span-4 md:col-span-3">{children}</div>
    </div>
  );
};

export default layout;
