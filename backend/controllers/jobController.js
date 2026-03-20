const { Job, Skill } = require("../models");

// CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const { title, description, experience_required } = req.body;

    const job = await Job.create({
      title,
      description,
      experience_required,
      created_by: req.user.id,
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD SKILLS TO JOB
exports.addSkills = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    console.log("Adding skills to job:", job.id);
    const { skills } = req.body;

    const skillInstances = await Promise.all(
      skills.map(async (name) => {
        const [skill] = await Skill.findOrCreate({ where: { name } });
        return skill;
      })
    );
    console.log("Adding skills to job:", job.id);
    await job.addSkills(skillInstances);

    res.json({ msg: "Job skills added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL JOBS
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
        attributes: ["title"],
        include:{
            model: Skill,
            attributes: ["name"],
            through:{ attributes: [] }
        }
    });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const matchService = require("../services/matchService");

// GET MATCHED JOBS
exports.getMatches = async (req, res) => {
  try {
    const data = await matchService.matchJobs(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};