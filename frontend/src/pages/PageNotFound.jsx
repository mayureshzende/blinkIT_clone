import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="text-3xl">
      The Page you are looking for does not exists.
      <h3 className="">
        Do You want to go to Home Page.{" "}
        <Link className="text-secondary underline cursor-pointer" to="/">
          Home
        </Link>
      </h3>
    </div>
  );
};

export default PageNotFound;
