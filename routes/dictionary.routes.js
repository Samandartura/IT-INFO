const { Router } = require("express");
const router = Router();
const {
    addTerm,
    getTerms,
    getTermsByLetter,
    getTermById,
    getTermsByTerm,
    updateTermById,
    deleteTermById,
} = require("../controllers/dictionary.controller");
const adminActivePolice = require("../middleware/adminActivePolice");

router.post("/", adminActivePolice(), addTerm);
router.get("/", getTerms);
router.get("/letter/:letter", getTermsByLetter);
router.get("/:id", getTermById);
router.get("/term/:term", getTermsByTerm);
router.put("/:id", adminActivePolice(), updateTermById);
router.delete("/:id", adminActivePolice(), deleteTermById);

module.exports = router;
