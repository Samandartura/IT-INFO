const { Router } = require("express");
const {
  addUser,
  getAllUsers,
  updateUser,
  loginUser,
  deleteUser,
  userAcriveate,
} = require("../controllers/user.controller");
const router = Router();
const Validator = require("../middleware/validator");

router.post("/add", Validator("user"), addUser);
router.get("/", getAllUsers);
router.put("/:id", Validator("user"), updateUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);
router.get("/activate/:link",userAcriveate)

module.exports = router;
