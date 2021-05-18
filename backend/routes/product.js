const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/products").get(isAuthenticatedUser, getProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, newProduct);

router.route("/product/:id").get(isAuthenticatedUser, getSingleProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, getSingleProduct)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
