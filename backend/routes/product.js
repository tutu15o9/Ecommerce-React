const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAlldiffCategories
} = require("../controllers/product");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Params
router.param("userId", getUserById);

router.param("productId", getProductById);

// Actual routes
// Create Route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
// Read Route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// Update Route

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
// Delete Route
router.post(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// Listing route

router.get("/products",getAllProducts);

router.get("/products",getAlldiffCategories);
module.exports = router;
