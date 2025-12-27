import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ props }) => {
  const { _id, category, image, description, name, price } = props;

  //   console.log(_id, category, image, description, name);
  return (
    <div className="flex flex-col w-[180px] h-[180px]  rounded-2xl bg-background justify-center items-center drop-shadow-2xl ">
      {name ? (
        <>
          <Link to={`/menu/${_id}`}>
            <div className="flex flex-col w-[180px] h-[180px] justify-center items-center cursor-pointer">
              <div className=" flex w-[100px] h-[100px] ">
                <img
                  src={image}
                  alt="image"
                  className="h-full w-full min-h-[100px] min-w-[100px] rounded-2xl "
                />
              </div>
              <h3 className="text-center text-lg font-semibold">{name}</h3>
              <p className="text-center">{category}</p>
              <p className="text-center font-bold">
                <span>₹ </span>
                {Math.floor(price)}
              </p>
              <p className="hidden hover:block text-lg">{description}</p>
            </div>
          </Link>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <p>Loading...</p>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeCard;
