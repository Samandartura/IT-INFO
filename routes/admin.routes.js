const Router = require("express");
const {
  addAdmin,
  getAllAdmins,
  updateAdmin,
  loginAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const adminPolice = require("../middleware/adminPolice");
const adminActivePolice = require("../middleware/adminActivePolice");
const adminCreatorPolice = require("../middleware/adminCreatorPolice");
const Validator = require("../middleware/validator");
const router = Router();

router.post("/add", Validator("admin"), addAdmin);
router.get("/", adminPolice, getAllAdmins);
router.put("/:id", Validator("admin"), adminActivePolice(), updateAdmin);
router.post("/login", loginAdmin);
router.delete("/:id", adminCreatorPolice(), deleteAdmin);

module.exports = router;
