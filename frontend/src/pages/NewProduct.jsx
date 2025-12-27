import React, { useState } from "react";
import { GrDocumentUpload } from "react-icons/gr";
import { profileImgConverter } from "../utilities/profileImgCoverter";
import toast from "react-hot-toast";

const DEV_URL = import.meta.env.VITE_APP_API_URL;

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "other",
    image: "",
    price: "",
    description: "",
  });

  const handleFormChange = (e) => {
    e.preventDefault();
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleUploadImage = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const convertedImage = await profileImgConverter(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: convertedImage,
    }));
  };

  const handleClick = async () => {
    // console.log(data);
    const { name, category, image, price, description } = data;
    if (name && category && image && price && description) {
      const createProduct = await fetch(DEV_URL + "/api/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const productResponse = await createProduct.json();

      if (productResponse.status === "success") {
        toast.success(productResponse.message);
        setTimeout(() => {
          setData({
            name: "",
            category: "other",
            image: "",
            price: "",
            description: "",
          });
        }, 800);
      } else {
        toast.error(productResponse.message);
      }
    } else {
      toast.error("Please enter the required Fields");
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="flex w-full max-w-sm flex-col p-3 mt-5 bg-background rounded-2xl shadow-2xl md:max-w-md md:p-5">
        <div className="flex justify-center items-center">
          <span className="font-bold text-2xl">Add new Product</span>
        </div>
        <div>
          <form action="submit" className="flex flex-col gap-2 my-2">
            <label htmlFor="name">Name of Product</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleFormChange}
              value={data?.name}
              className="w-full rounded focus-within:outline-2 focus-within:outline-border bg-primary p-1"
            />
            <label htmlFor="category">Prouct Type</label>
            <select
              name="category"
              id="category"
              defaultValue={data.category}
              className="w-full bg-primary p-1 rounded"
              onChange={handleFormChange}
            >
              <option className="p-1" value="other" disabled>
                Select Product type
              </option>
              <option className="p-1" value={"fruits"}>
                Fruits
              </option>
              <option className="p-1" value={"vegetable"}>
                Vegetable
              </option>
              <option className="p-1" value={"icecream"}>
                Icecream
              </option>
              <option className="p-1" value={"dosa"}>
                Dosa
              </option>
              <option className="p-1" value={"pizza"}>
                Pizza
              </option>
              <option className="p-1" value={"rice"}>
                rice
              </option>
              <option className="p-1" value={"cake"}>
                Cake
              </option>
              <option className="p-1" value={"burger"}>
                Burger
              </option>
              <option className="p-1" value={"panner"}>
                Panner
              </option>
            </select>
            <label htmlFor="image" className="cursor-pointer ">
              Image
              <div
                className={`w-full rounded h-[100px] overflow-hidden bg-primary flex justify-center items-center mt-2 backdrop-blur-md `}
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadImage}
                />
                {data?.image ? (
                  <img
                    src={data?.image}
                    alt="product Image"
                    className="flex h-full hover:scale-125 w-fit "
                  />
                ) : (
                  <GrDocumentUpload className="text-5xl hover:text-hover" />
                )}
              </div>
            </label>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              onChange={handleFormChange}
              value={data?.price}
              id="price"
              className="w-full bg-primary rounded focus-within:outline-2 focus-within:outline-border p-1"
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={handleFormChange}
              value={data?.description}
              rows={3}
              type="text"
              className="w-full rounded focus-within:outline-2 focus-within:outline-border bg-primary p-1"
            />
          </form>
        </div>
        <div className="flex w-full justify-center items-center my-4">
          <button
            onClick={handleClick}
            className="bg-secondary hover:bg-hover w-[50%] py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
