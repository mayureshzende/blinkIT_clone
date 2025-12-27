import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CardFeature from "../components/CardFeature";
import { addToCart } from "../redux/productSlice";

const Menu = () => {
  const allProducts = useSelector((state) => state.allProductsData.allProducts);

  const params = useParams();
  // console.log(params.productId);
  const dispatch = useDispatch();
  const handleAddtoCart = () => {
    // console.log("adding to cart product with id ", props);
    dispatch(addToCart(productFileteredById));
  };
  const productFileteredById = allProducts.filter(
    (ele) => ele._id === params.productId
  )[0];
  // console.log(productFileteredById.image);
  return (
    <>
      {productFileteredById ? (
        <>
          <div className="flex mt-3  max-w-[100%] drop-shadow-2xl justify-center items-center rounded-2xl">
            <div className="flex bg-background w-[300px] md:w-[800px] max-h-[350px]  overflow-hidden rounded-2xl">
              {/* product Image */}
              <div className="flex w-1/2 h-[350px] md:w-[450px] rounded-2xl hover:scale-105 ">
                <img
                  src={productFileteredById.image || ""}
                  alt="prdouct"
                  className="bg-clip-content md:h-[350px] md:w-[400px]"
                />
              </div>
              {/* product details */}
              <div className="flex p-2 flex-col w-1/2 gap-2">
                <h1 className="text-3xl">{productFileteredById.name || ""}</h1>
                <h1 className="text-xl">
                  {productFileteredById.category || ""}
                </h1>
                <h1 className="text-lg">
                  <span className="font-bold">₹ </span>
                  {Math.floor(productFileteredById.price || " ")}
                </h1>
                <p className="text-lg">
                  <span className="font-bold">Description: </span>
                  {productFileteredById.description || ""}
                </p>
                <div className="flex gap-3 md:flex-row flex-col">
                  <button
                    onClick={() => handleAddtoCart(productFileteredById)}
                    className="p-2 w-[100px] text-md bg-secondary hover:bg-hover rounded-2xl"
                  >
                    Add to Cart
                  </button>
                  <button className="p-2 text-md w-[100px] bg-secondary hover:bg-hover rounded-2xl">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* display all products */}
          <div className="flex p-5 text-2xl font-bold">
            <h1>Related Products:</h1>
          </div>
          <div className="flex flex-wrap gap-6 w-full justify-center items-center mt-8">
            {allProducts &&
              allProducts.map((ele, id) => (
                <CardFeature props={ele} key={id} />
              ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col min-w-full justify-center text-center">
          {" "}
          <h2>
            No Product to display please go to Home and select the Product -{" "}
          </h2>
          <p>
            <Link className="text-2xl font-semibold" to="/">
              /Home{" "}
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Menu;
