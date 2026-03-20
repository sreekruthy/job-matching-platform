const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");

// Create job (only recruiter ideally)
router.post("/", auth, jobController.createJob);

// Add skills to job
router.post("/:id/skills", auth, jobController.addSkills);

// Get jobs
router.get("/match", auth, jobController.getMatches);

module.exports = router;