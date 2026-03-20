const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.post("/skills", auth, userController.addSkills);
router.get("/profile", auth, userController.getProfile);

module.exports = router;