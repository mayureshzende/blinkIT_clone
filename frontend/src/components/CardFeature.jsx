import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/productSlice";
const CardFeature = ({ props }) => {
  const { _id, category, image, description, name, price } = props;
  const dispatch = useDispatch();
  const handleAddtoCart = () => {
    // console.log("adding to cart product with id ", props);
    dispatch(addToCart(props));
  };
  //   console.log(_id, category, image, description, name);
  return (
    <div className="flex  flex-col w-[180px] h-[260px] rounded-2xl bg-background justify-center items-center drop-shadow-2xl ">
      {name ? (
        <>
          <div className="flex gap-1.5 p-2 flex-col w-[180px] h-[180px] justify-center items-center">
            <Link to={`/menu/${_id}`}>
              <div>
                <div className=" flex w-[100px] h-[100px]">
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
          </div>
          <div>
            <button
              onClick={handleAddtoCart}
              className="py-2 px-4  bg-secondary rounded cursor-pointer hover:bg-hover"
            >
              Add to Cart
            </button>
          </div>
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

export default CardFeature;
