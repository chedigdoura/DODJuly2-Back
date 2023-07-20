import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProdutsBySupplier,
  updateProduct,
} from "./../controllers/product.js";

router.post("/", auth, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", auth, deleteProduct);
router.patch("/:id", auth, updateProduct);
router.get("/supplierProducts/:id", auth, getProdutsBySupplier);
export default router;
