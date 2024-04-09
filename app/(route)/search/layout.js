import React from "react";
import CatergoryList from "./_components/CatergoryList";

const layout = ({ children }) => {
  return (
    <div className=" grid grid-cols-4">
      <div>
        <CatergoryList />
      </div>

      <div className=" col-span-3">{children}</div>
    </div>
  );
};

export default layout;
