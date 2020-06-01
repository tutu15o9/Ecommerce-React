const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }

    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body);

  newCategory.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: " Not able to save category in DB",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category found in DB",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to Update Category Try Again",
      });
    }
    res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  const name = category.name;
  category.remove((err, removedCategory) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete Category ${name}.`,
      });
    }
    res.json({
      message: `Successfully Delted ${name}.`,
    });
  });
};
