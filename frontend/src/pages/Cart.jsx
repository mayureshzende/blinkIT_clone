import React from "react";
import CartCard from "../components/CartCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Cart = () => {
  const cartProducts = useSelector(
    (state) => state.allProductsData.CartProducts
  );
  // console.log("cart items are ", cartProducts);

  return (
    <div>
      {/* continer div */}
      <div className="bg-background min-h-[50vh] min-w-[60%] m-4 p-4 rounded-2xl gap-5 flex flex-col">
        {/* cartCard */}
        {cartProducts.length > 0 ? (
          cartProducts.map((cp, id) => (
            <div
              className="bg-header min-h-[200px] w-full p-4 rounded-2xl"
              key={id}
            >
              <CartCard product={cp} />
            </div>
          ))
        ) : (
          <div className="flex flex-col text-3xl justify-center items-center">
            <h1>No Items in the cart.</h1>
            <Link to="/">Go to /Home</Link>
          </div>
        )}
        {/* <div className="bg-header min-h-[200px] w-full p-4 rounded-2xl">
          <CartCard />
        </div>
        <div className="bg-header min-h-[200px] w-full p-4 rounded-2xl">
          <CartCard />
        </div>
        <div className="bg-header min-h-[200px] w-full p-4 rounded-2xl">
          <CartCard />
        </div>
        <div className="bg-header min-h-[200px] w-full p-4 rounded-2xl">
          <CartCard />
        </div> */}
      </div>
    </div>
  );
};

export default Cart;
