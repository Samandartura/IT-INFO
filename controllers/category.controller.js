const { default: mongoose } = require("mongoose");
const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/category");
const { categoryValidation } = require("../validations/category");

const addCategory = async (req, res) => {
  try {
    // const { error, value } = categoryValidation(req.body);
    // if (error) {
    //     // console.log(value);
    //     return res.status(400).send({ message: error.details[0].message });
    // }

    const { category_name, parent_category_id } = req.body;

    const category = await Category.findOne({
      category_name: { $regex: category_name, $options: "i" },
    });
    if (category) {
      return res.status(400).send({ message: "Category exists" });
    }
    if (parent_category_id) {
      const newCategory = await Category({
        category_name,
        parent_category_id,
      });
      await newCategory.save();
    } else {
      const newCategory = await Category({
        category_name,
      });
      await newCategory.save();
    }
    res.status(200).send({ message: "Category added" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllCatergories = async (req, res) => {
  try {
    const category = await Category.find({}).populate("parent_category_id");
    if (category.length < 1) {
      return res.status(400).send({ message: "Categories not found" });
    }
    res.json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).send({ message: "Category not found" });
    }
    const deleted = await Category.deleteOne({ _id: req.params.id });
    if (!deleted.acknowledged) {
      return res.status(400).send({ message: "Category is not deleted" });
    }
    res.status(200).send({ message: "Category deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    // const { id } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid id" });
    // }
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).send({ message: "Category not found" });
    }
    const { category_name, parent_category_id } = req.body;

    if (parent_category_id) {
      const updated = await Category.updateOne(
        { _id: req.params.id },
        { $set: { category_name, parent_category_id } }
      );
    } else {
      const updated = await Category.updateOne(
        { _id: req.params.id },
        { $set: { category_name } }
      );
    }
    res.status(200).send({ message: "Category updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
    }).populate("parent_category_id");
    if (!category) {
      return res.status(400).send({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCategoryByName = async (req, res) => {
  try {
    const category = await Category.findOne({
      category_name: { $regex: req.params.category_name, $options: "i" },
    });
    if (!category) {
      return res.status(400).send({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addCategory,
  getAllCatergories,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getCategoryByName,
};
