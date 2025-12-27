import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../components/HomeCard";
import CardFeature from "../components/CardFeature";
import FilterProducts from "../components/FilterProducts";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const Home = () => {
  const [filterProducts, setFilterProducts] = useState([]);
  const [active, setActive] = useState("");
  const allProducts = useSelector((state) => state.allProductsData.allProducts);
  const loadingData = new Array(5).fill("Loading...");
  // console.log(loadingData);
  const categories = [...new Set(allProducts.map((ele) => ele.category))];
  // console.log(categories);
  const vegetablesData = allProducts.filter(
    (ele) => ele.category === "vegetable"
  );
  const displayProducts = allProducts.slice(0, 6) || [];
  // console.log("displayProducts are", displayProducts);
  // console.log("vegetable are", vegetablesData);
  const scrollPositionRef = useRef();

  const handleGoPrevious = () => {
    // console.log("going back");
    scrollPositionRef.current.scrollLeft -= 250;
  };
  const handleGoForward = () => {
    // console.log("goind forward");
    scrollPositionRef.current.scrollLeft += 250;
  };

  useEffect(() => {
    setFilterProducts(allProducts);
  }, []);

  const hanldeFilterClick = (prodName) => {
    // console.log("clicked filter", prodName);
    const filetProds = allProducts.filter(
      (ele) => ele.category.toLowerCase() === prodName.toLowerCase()
    );
    // console.log(filetProds);
    if (filetProds.length) {
      setActive(filetProds[0].category.toLowerCase());
      setFilterProducts(filetProds);
    } else {
      setActive("");
      setFilterProducts(allProducts);
    }
  };
  return (
    <>
      <div className="h-[100%] w-[100%] md:flex gap-4 md:overflow-visible ">
        {/* left side */}
        <div className="flex flex-col md:w-1/2 sm:w-full gap-6 p-3 overflow-hidden ">
          <h1 className="text-4xl font-semibold">
            Get the{" "}
            <span className="text-secondary underline">
              Essentials Delivered
            </span>{" "}
            as quickly as{" "}
            <span className="text-secondary underline">10 mins.</span>
          </h1>

          <h3>
            <span className="text-[16px]">
              Craving fresh groceries, daily essentials, or gourmet treats?
              We’ve got you covered delivered to your doorstep within just 10
              minutes!
            </span>
          </h3>
          <div className="text-md hidden md:block">
            <h4>
              <div className="flex pb-2">
                <span className="text-secondary font-bold text-lg">
                  ✨ Why Choose Us?
                </span>
              </div>
            </h4>
            <div className="md:flex gap-1.5 flex-col ">
              <p>
                🥦 Farm-Fresh Fruits & Veggies – Handpicked for peak freshness.
              </p>
              <p>🥛Dairy & Bakery Delights – Always fresh, always delicious.</p>
              <p>
                🧼Everyday Essentials – From toothpaste to turmeric, all at your
                fingertips.
              </p>
              <p>
                🚴 Lightning-Fast Delivery – 10 minutes or less, guaranteed.
              </p>
              <p>
                📍 Hyperlocal Warehouses – Stocked near you for instant
                dispatch.
              </p>
            </div>
          </div>
          <div>
            <p>
              Say goodbye to long grocery runs and empty kitchens. With a few
              clicks, get everything you need — fresh, fast, and hassle-free. 🧡
              Fresh is not just a promise, it's our habit. Shop now and
              experience the new era of instant e-commerce!
            </p>
          </div>
          <div className="flex ">
            <button className="cursor-pointer bg-secondary text-xl p-3 min-w-[40px] hover:bg-hover rounded-2xl">
              Order Now
            </button>
          </div>
        </div>
        {/* right side */}
        <div className="hidden md:w-1/2 md:flex p-3 flex-wrap gap-4 justify-center overflow-hidden">
          {/* display products from the db*/}
          {displayProducts.length > 0
            ? displayProducts.map((ele, id) => (
                <HomeCard props={ele} key={id} />
                // <img
                //   src={ele.image}
                //   alt={ele.description}
                //   id={ele._id}
                //   className="h-[100px] w-[100px] bg-background rounded-2xl"
                // />
              ))
            : loadingData.map((ele, id) => <HomeCard props={ele} key={id} />)}
        </div>
      </div>
      {/* fresh vegetables scroll list */}
      <div className=" md:flex flex-col h-[60%] w-[100%] ">
        <div className=" flex justify-between w-full">
          <div>
            <h3 className="text-3xl text-center font-semibold p-4 flex ">
              Fresh vegetables
            </h3>
          </div>
          <div className="flex justify-center items-center gap-2 px-3">
            <IoArrowBack
              onClick={handleGoPrevious}
              className="text-4xl p-1 bg-secondary hover:bg-hover cursor-pointer rounded"
            />
            <IoArrowForward
              onClick={handleGoForward}
              className="text-4xl p-1 bg-secondary hover:bg-hover cursor-pointer rounded"
            />
          </div>
        </div>

        <div className="flex p-3 ">
          <div
            ref={scrollPositionRef}
            className="flex gap-7 p-3 drop-shadow-2xl overflow-scroll scrollbar-none scroll-smooth transition-all min-h-[200px] h-[280px] rounded"
          >
            {vegetablesData.length > 0
              ? vegetablesData.map((ele, id) => (
                  <CardFeature props={ele} key={id} />
                ))
              : loadingData.map((ele, id) => (
                  <CardFeature props={ele} key={id} />
                ))}
          </div>
        </div>
      </div>
      {/* adding filter products section here */}
      <div className="flex flex-col gap-1.5 text-center px-auto justify-center items-center">
        <div
          onClick={() => hanldeFilterClick("all")}
          className="flex flex-col justify-center items-center bg-background rounded-full
      p-3 h-[40px] w-[40px] cursor-pointer"
        >
          <IoCloseSharp className="text-4xl" />
        </div>
        <p>Clear filter</p>
      </div>
      <div className="mt-4 flex flex-col px-4 ">
        <div className="flex gap-4  justify-center items-center drop-shadow-2xl overflow-scroll transition-all scroll-smooth scrollbar-none">
          <div className="flex gap-4 w-full md:justify-center">
            {categories &&
              categories.map((ele, id) => (
                <div className="" key={id}>
                  <FilterProducts
                    isActive={ele.toLowerCase() === active.toLowerCase()}
                    ele={ele}
                    key={id + ele}
                    filterClick={() => hanldeFilterClick(ele)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* display all filter products for user */}
      <div className="flex flex-wrap gap-6 w-full justify-center items-center mt-8">
        {filterProducts.length > 0 &&
          filterProducts.map((ele, id) => <CardFeature props={ele} key={id} />)}
      </div>
    </>
  );
};

export default Home;
