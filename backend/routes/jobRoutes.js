const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");
const{ Job, Application, User } = require("../models");

// Create job (only recruiter ideally)
router.post("/", auth, jobController.createJob);

// Add skills to job
router.post("/:id/skills", auth, jobController.addSkills);

// Get jobs
router.get("/match", auth, jobController.getMatches);

// Apply to job
router.post("/apply/:jobId", auth, async (req, res) => {
  try {
    const user = req.user;
    const jobId = req.params.jobId;

    // check duplicate application
    const existing = await Application.findOne({
      where: {
        UserId: user.id,
        JobId: jobId,
      },
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    await Application.create({
      UserId: user.id,
      JobId: jobId,
    });

    res.json({ message: "Applied successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error applying" });
  }
});

// Get applicants for a job (only recruiter)
router.get("/applicants", auth, async (req, res) => {
  try {
    const user = req.user;

    const jobs = await Job.findAll({
      where: { created_by: user.id },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
          through: { attributes: [] }, // removes Application table data
        },
      ],
    });

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching applicants" });
  }
});

module.exports = router;