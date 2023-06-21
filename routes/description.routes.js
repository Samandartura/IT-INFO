const { Router } = require("express");
const router = Router();
const {
    addDescription,
    getDescriptions,
} = require("../controllers/description.controller");
const adminActivePolice = require("../middleware/adminActivePolice");

router.get("/", getDescriptions);
router.post("/", adminActivePolice(), addDescription);

module.exports = router;
