const { Router } = require("express");
const router = Router();
const {
  addCategory,
  getAllCatergories,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getCategoryByName,
} = require("../controllers/category.controller");
const adminActivePolice = require("../middleware/adminActivePolice");
const Validator = require("../middleware/validator");

router.get("/", getAllCatergories);
router.get("/:id", adminActivePolice(), getCategoryById);
router.get("/category/:category_name", getCategoryByName);
router.post("/add", Validator("category"), adminActivePolice(), addCategory);
router.delete("/:id", adminActivePolice(), deleteCategory);
router.put("/:id", Validator("category"), adminActivePolice(), updateCategory);

module.exports = router;
