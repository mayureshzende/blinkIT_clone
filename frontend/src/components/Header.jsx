import React, { useState } from "react";
// import logo from "/assest/logo.png";
// import colorShop from "/assest/color_shop_svg.svg";
import shopsvg from "/assest/shop_svg.svg";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const ADMIN_EMAIL = import.meta.env.VITE_APP_ADMIM_EMAIL;

const Header = () => {
  const [showLoginMenu, setLoginMenu] = useState(false);
  const handleLoginClick = () => {
    setLoginMenu((prev) => !prev);
  };
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.user);
  const cartData = useSelector((state) => state.allProductsData.CartProducts);
  const userProfileImg = userData.profileImg || null;
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout Successful");
  };
  return (
    <>
      <div className="flex fixed w-full shadow-2xl px-2 md:px-4 bg-header justify-between items-center z-50">
        <div
          id="logo"
          className="flex max-w-sm py-2 flex-row justify-center items-center gap-1"
        >
          {/* desktop */}
          <Link to="/">
            <img src={shopsvg} alt="logo" className="flex h-14 p" />
          </Link>
          <Link to="/">
            <p>Eshop</p>
          </Link>
        </div>
        <div className="flex justify-between items-center gap-2 md:gap-4">
          <nav className="hidden md:flex flex-row gap-2 md:gap-4 list-none text-xl ">
            <Link to="/">Home</Link>
            <Link to="menu/686411779b6c8a60bf6e929e">Menu</Link>
            <Link to="about">About</Link>
            <Link to="contact">Contact</Link>
          </nav>
          <div className=" text-3xl flex gap-6 md:gap-6 items-center relative">
            <div className="relative">
              <Link to="/cart">
                <IoMdCart className="" />
              </Link>
              <div className="absolute -top-3 justify-center -right-5 border-1 rounded-full text-sm px-2 pb-1 bg-primary text-black text-center">
                <p>{cartData.length > 0 ? cartData.length : 0}</p>
              </div>
            </div>
            <div className="relative cursor-pointer" onClick={handleLoginClick}>
              {userProfileImg ? (
                <div className="flex h-[30px] w-[30px] rounded drop-shadow-2xl ">
                  <img
                    src={userProfileImg}
                    className="flex rounded-full shadow-md drop-shadow-lg"
                    alt="userProfileImg"
                  />
                </div>
              ) : (
                <HiOutlineUserCircle />
              )}
              {showLoginMenu && (
                <div className="absolute min-w-[140px] text-lg whitespace-nowrap bg-primary p-2 px-3 right-2 flex flex-col rounded-2xl gap-1 text-center">
                  <div>
                    <nav className="md:hidden flex flex-col gap-1 md:gap-1 list-none text-lg ">
                      <Link to="/">Home</Link>
                      <Link to="menu">Menu</Link>
                      <Link to="about">About</Link>
                      <Link to="contact">Contact</Link>
                    </nav>
                  </div>
                  {userData?.email && userData.email === ADMIN_EMAIL && (
                    <Link to="newProduct">New Product</Link>
                  )}
                  {userData?.email ? (
                    <p
                      onClick={handleLogout}
                      className="text-red-500 font-semibold"
                    >
                      logout
                    </p>
                  ) : (
                    <Link
                      className="cursor-pointer text-border hover:text-hover underline font-semibold"
                      to="login"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
