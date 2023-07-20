import ProductModal from "../models/product.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new ProductModal({
    ...product,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModal.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModal.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getProdutsBySupplier = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const supplierProducts = await ProductModal.find({ creator: id });
  res.status(200).json(supplierProducts);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `no product exists with this id : ${id}` });
    }
    await ProductModal.findByIdAndRemove(id);
    res.json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    creator,
    name,
    supplier,
    tags,
    imageFile,
    createdAt,
    likeCount,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `no product exists with this id : ${id}` });
    }
    const updatedProduct = {
      title,
      description,
      creator,
      name,
      supplier,
      tags,
      imageFile,
      createdAt,
      likeCount,
      _id: id,
    };
    await ProductModal.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
