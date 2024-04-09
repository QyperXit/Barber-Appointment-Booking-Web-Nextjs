"use client";
import React, { useEffect } from "react";

const Search = ({ params }) => {
  useEffect(() => {
    console.log(params);
  }, []);
  return <div>Search</div>;
};

export default Search;
