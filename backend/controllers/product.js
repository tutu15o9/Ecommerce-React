const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
// Middleware controllers
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("categories")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found.",
        });
      }
      req.product = product;
      next();
    });
};

exports.updateStock = (req, res, next) => {
  var myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, Products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk Operation Failed",
      });
    }

    next();
  });
};

// Create controllers
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image.",
      });
    }

    // Destructuring the Feilds
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please Include all the feilds",
      });
    }
    let product = new Product(fields);
    if (file.photo) {
      if (file.photo.size > 3145728) {
        return res.status(400).json({
          error: "File Size too big.",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save to Db

    product.save((err, prod) => {
      if (err) {
        return res.status(400).json({
          error: "Saving Product to Db failed",
        });
      }
      res.json(prod);
    });
  });
};

// Read Controllers
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? parseInt(req.query.sortBy) : "_id";

  Product.find()
    .select("-phtoto")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product Found.",
        });
      }
      res.json(products);
    });
};

exports.getAlldiffCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category Found",
      });
    }

    res.json(categories);
  });
};
// Delete controllers
exports.deleteProduct = (req, res, next) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to delete theImage.",
      });
    }
    res.json({
      message: "Product deleted.",
      product: deletedProduct,
    });
  });
};
// Update controllers
exports.updateProduct = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image.",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (file.photo) {
      if (file.photo.size > 3145728) {
        return res.status(400).json({
          error: "File Size too big.",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save to Db

    product.save((err, prod) => {
      if (err) {
        return res.status(400).json({
          error: "Saving Product to Db failed",
        });
      }
      res.json(prod);
    });
  });
};
