import express from "express";
import * as productController from "../controller/productController.js";
const productsrouter = express.Router();
productsrouter.get("/products", productController.getAllProducts);
productsrouter.post("/products", productController.addProduts);
export default productsrouter;
