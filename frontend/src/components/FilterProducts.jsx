import React from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";

const FilterProducts = ({ ele, filterClick, isActive }) => {
  return (
    <>
      <div className="flex w-full justify-center items-center flex-col gap-1.5">
        <div
          onClick={filterClick}
          className={`flex justify-center items-center rounded-full p-3 h-[80px] w-[80px]  cursor-pointer ${
            isActive ? "bg-secondary" : "bg-background"
          }`}
        >
          <GiForkKnifeSpoon className="text-4xl" />
        </div>
        <p>{ele}</p>
      </div>
    </>
  );
};

export default FilterProducts;
