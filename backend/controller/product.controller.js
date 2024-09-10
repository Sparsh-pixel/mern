import Product from "../../backend/models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const allProduct = await Product.find();
    res.status(200).json({ success: true, data: allProduct });
  } catch (error) {
    console.log("error in fetching product", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const createProduct = async (req, res) => {
  const prod = req.body;

  if (!prod.name || !prod.price || !prod.image) {
    return res
      .status(400)
      .json({ success: false, message: "empty product are not added" });
  }
  const newProd = new Product(prod);
  try {
    await newProd.save();
    res.status(201).json({ success: true, data: newProd });
  } catch (error) {
    console.log("error in create product", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const prod = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, prod, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating in products" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "successfully deleted" });
  } catch (error) {
    console.log("error in deleting product", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};
