import React, { useState } from "react";
import singupgif from "/assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
const DEV_URL = import.meta.env.VITE_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // const userState = useSelector((state) => state.userData.user);
  const dispatch = useDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { password, email } = data;
    if (email && password) {
      // alert("success");
      const user = await fetch(DEV_URL + "/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const response = await user.json();
      // console.log(response);
      if (response.status === "success") {
        toast.success(response.message);
        setTimeout(() => {
          setData({
            email: "",
            password: "",
          });
          // console.log("user state first ", userState);
          dispatch(loginUser(response.data));
          // console.log("user selector state after dispatch ", userState);
          navigate("/");
        }, 800);
      } else {
        toast.error(response.message);
      }
    } else {
      toast.error("Please enter the required Fields");
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-sm md:max-w-md md:p-5 bg-background mt-5 flex-col justify-center gap-2 p-3 rounded-2xl shadow-2xl">
        <div className="flex justify-center items-center  rounded-full  relative flex-col gap-2 w-full">
          <span className="font-bold text-2xl">Login</span>
          <img
            src={singupgif}
            alt="singupgif"
            className="h-[60px] max-w-[60px] overflow-hidden rounded-full shadow-md drop-shadow-md justify-center"
          />
        </div>
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-2"
          >
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
          </form>
        </div>
        <div className="flex justify-center my-4 font-semibold">
          <button
            className="py-2 px-4 bg-secondary rounded cursor-pointer hover:bg-hover w-[50%]"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
        </div>
        <div>
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="cursor-pointer text-border hover:text-hover underline font-semibold"
            >
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
