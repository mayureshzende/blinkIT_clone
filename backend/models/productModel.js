import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productModel = model("product", productSchema);

export default productModel;
