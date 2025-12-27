import React, { useState } from "react";
import singupgif from "/assest/login-animation.gif";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { profileImgConverter } from "../utilities/profileImgCoverter";
import toast from "react-hot-toast";

const DEV_URL = import.meta.env.VITE_APP_API_URL;

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImg: "",
  });
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };
  const handleShowConPass = () => {
    setShowConPass((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { firstName, lastName, password, confirmPassword, email } = data;
    // console.log(
    //   `firstName: ${typeof firstName} lastName: ${lastName} password: ${password} confirmPassword: ${confirmPassword} email: ${email}`
    // );
    if (firstName && lastName && email && password && confirmPassword) {
      if (confirmPassword !== password) {
        alert("Password do not match!");
      } else {
        // alert("success");
        // console.log(typeof dev_url);
        // console.log(" user", data);
        // setData({
        //   firstName: "",
        //   lastName: "",
        //   email: "",
        //   password: "",
        //   confirmPassword: "",
        // });
        try {
          const reqdata = await fetch(DEV_URL + "/api/signup", {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify(data),
          });
          const resData = await reqdata.json();
          console.log(resData);
          if (resData?.status.toLowerCase() === "success") {
            toast.success(resData.message);
            setTimeout(() => {
              setData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
              navigate("/login");
            }, 800);
          } else {
            toast.error(resData.message);
          }
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      toast.error("Please enter the required Fields");
    }
  };

  const handleOnProfileSubmit = async (e) => {
    // console.log(e.target.files[0]);
    const b64Img = await profileImgConverter(e.target.files[0]);
    // console.log(b64Img);
    setData((prev) => ({
      ...prev,
      profileImg: b64Img,
    }));
  };
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-sm md:max-w-lg md:p-5 bg-background mx-4 flex-col justify-center gap-2 p-3 rounded-2xl shadow-2xl">
        <div className="flex justify-center items-center  rounded-full flex-col gap-2 w-full overflow-hidden relative">
          <span className="font-bold text-2xl">Sign up</span>
          <img
            src={data.profileImg ? data.profileImg : singupgif}
            alt="singupgif"
            className="h-[80px] max-w-[80px] overflow-hidden rounded-full shadow-md drop-shadow-md justify-center"
          />
          <div className="absolute bottom-0">
            <label
              className="cursor-pointer text-sm rounded bottom-0 -right-7 flex justify-center bg-primary opacity-90 overflow-hidden px-2 font-semibold"
              htmlFor="profileImg"
            >
              <input
                id="profileImg"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleOnProfileSubmit}
              />
              Upload
            </label>
          </div>
        </div>
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-2"
          >
            <label htmlFor="firstName" className="font-semibold">
              First Name
            </label>
            <input
              onChange={(e) => handleFormChange(e)}
              type="text"
              id="firstName"
              name="firstName"
              value={data.firstName}
              //   className="rounded border-1 bg-primary focus:border-indigo-600 focus:outline-hidden"
              className="rounded focus-within:outline-2 focus-within:outline-border bg-primary p-1"
            />
            <label htmlFor="lastName" className="font-semibold">
              Last Name
            </label>
            <input
              onChange={(e) => handleFormChange(e)}
              value={data.lastName}
              type="text"
              id="lastName"
              name="lastName"
              //   className="rounded border-1 bg-primary focus:border-indigo-600 focus:outline-hidden"
              className="rounded focus-within:outline-2 focus-within:outline-border bg-primary p-1"
            />
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={(e) => handleFormChange(e)}
              value={data.email}
              name="email"
              type="email"
              id="email"
              //   className="rounded border-1 bg-primary  focus:border-indigo-600 focus:outline-hidden"
              className="rounded focus-within:outline-2 focus-within:outline-border bg-primary p-1"
            />
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <div className="flex w-full rounded focus-within:outline-2 focus-within:outline-border bg-primary p-1">
              <input
                onChange={(e) => handleFormChange(e)}
                value={data.password}
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                //   className="rounded border-1 bg-slate-300 focus:border-indigo-600 focus:outline-hidden"
                className="w-full border-none outline-none"
              />
              <span
                className="text-2xl  cursor-pointe"
                onClick={handleShowPass}
              >
                {showPass ? <BiHide /> : <BiShow />}
              </span>
              {/* <div className="flex  justify-end end-0 text-2xl w-full items-end"></div> */}
            </div>
            <label className="font-semibold" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="flex w-full rounded focus-within:outline-2 focus-within:outline-border bg-primary p-1">
              <input
                onChange={(e) => handleFormChange(e)}
                value={data.confirmPassword}
                type={showConPass ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className="border-none outline-none w-full"
              />
              <span
                className="text-2xl cursor-pointer"
                onClick={handleShowConPass}
              >
                {showConPass ? <BiHide /> : <BiShow />}
              </span>
            </div>
          </form>
        </div>
        <div className="flex justify-center my-4 font-semibold">
          <button
            className="py-2 px-4 bg-secondary rounded cursor-pointer hover:bg-hover w-[50%]"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
        </div>
        <div>
          <p>
            Already have and account?{" "}
            <Link
              to="/login"
              className="cursor-pointer text-border hover:text-hover underline font-semibold"
            >
              <span>login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
