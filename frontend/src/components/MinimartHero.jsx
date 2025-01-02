import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const MinimartHero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemSearch = (e) => {
    e.preventDefault();
    searchParams.set("query", searchTerm);
    setSearchParams(searchParams);
    setSearchTerm("");
  };

  return (
    <div className="px-5 xl:px-10 md:w-1/2 mb-10">
      <h1 className="mt-6 mb-10 text-5xl xl:text-6xl text-center font-bold text-[#2A3342] leading-normal xl:leading-relaxed">
        MiniMart
      </h1>
      <form
        onSubmit={handleItemSearch}
        className="bg-white p-4 rounded relative flex item-center"
      >
        <MdOutlineSearch className="w-5 h-5 mr-2 text-neutral-300" />
        <input
          className="outline-none w-full placeholder:text-[#344f3766]"
          name="query"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an Item"
          id="search"
          required=""
        />
      </form>
    </div>
  );
};
export default MinimartHero;
