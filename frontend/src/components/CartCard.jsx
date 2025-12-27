import React from "react";
import { useDispatch } from "react-redux";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {
  deleteFromCart,
  increaseQnty,
  decreaseQnty,
} from "../redux/productSlice";
const CartCard = ({ product }) => {
  const { _id, category, image, name, price, quantity, TotalPrice } = product;
  const dispatch = useDispatch();
  const handleDeleteItemFromCart = () => {
    dispatch(deleteFromCart(_id));
  };
  //   console.log("quantity", quantity);
  //   console.log("quantity", product);
  return (
    <div className="flex gap-4">
      <div className=" rounded-2xl max-w-[200px] w-[200px]">
        <img
          className="h-[160px] w-[160px] rounded-2xl"
          src={image}
          alt="image"
        />
      </div>
      <div className="flex flex-col justify-between w-[100%]">
        <div className="flex flex-col gap-3s">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Product: {name}</h1>
            {/* <span>delete</span> */}
            <MdDelete
              className="text-2xl cursor-pointer"
              onClick={handleDeleteItemFromCart}
            />
          </div>
          <h2 className="text-lg ">Category: {category}</h2>
          <h2 className="text-lg font-bold">Price: ₹ {Math.floor(price)}</h2>
        </div>
        <div className="sm:flex md:flex justify-between w-[100%]">
          <div className="flex flex-col justify-center gap-1 w-1/2">
            <p className="text-xl">Quantity</p>
            <div className="flex gap-3  items-center">
              <div
                onClick={() => dispatch(decreaseQnty(_id))}
                className="bg-background p-1.5 items-center text-secondary rounded-2xl cursor-pointer"
              >
                <FiMinus />
              </div>

              <div className="flex bg-background h-[35px] w-[35px] justify-center items-center text-secondary rounded-2xl text-center ">
                <span>{quantity > 0 ? quantity : 1}</span>
              </div>
              <div
                onClick={() => dispatch(increaseQnty(_id))}
                className="bg-background p-1.5 items-center text-secondary rounded-2xl cursor-pointer"
              >
                <FiPlus />
              </div>
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <p className="text-xl font-semibold">Total Price</p>
            <p className="bg-background text-lg p-2 rounded-2xl">
              {TotalPrice > 0 ? TotalPrice : price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
