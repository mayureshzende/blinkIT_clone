import mongoose from "mongoose";
import productModel from "../models/productModel.js";

export const addProduts = async (req, res) => {
  //   console.log(req.body);
  try {
    const { name, category, image, price, description } = req.body;
    if (name && category && image && price && description) {
      const newProduct = productModel(req.body);
      const addProduct = await newProduct.save();
      res.status(201).json({
        data: { ...req.body },
        message: "New Product added successfully",
        status: "success",
      });
    } else {
      res.status(400).json({
        data: { ...req.body },
        message: "please add all the fields",
        status: "error",
      });
    }
  } catch (err) {
    console.error("error while adding new product", err);
    res.status(400).json({
      data: {},
      message: "Not able to add the product please try later.",
      status: "error",
    });
  }
};

// const getRandomPrice = () => Math.random() * 100 + 600;
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find({});
    // const updateallProducts = await productModel.updateMany(
    //   {},
    //   {
    //     $set: {
    //       price: getRandomPrice(),
    //     },
    //   },
    //   {
    //     multi: true,
    //   }
    // );
    // console.log("all products", allProducts);
    if (allProducts) {
      //   console.log(allProducts.length);
      res.status(200).json({
        data: JSON.stringify(allProducts),
        message: "Got all products",
        status: "success",
      });
    } else {
      res.status(200).json({
        data: [],
        message: "No Products found",
        status: "success",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: [],
      message: "Internal server Error",
      status: "error",
    });
  }
};
// export { addProduts };
