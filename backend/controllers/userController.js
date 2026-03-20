const { User, Skill } = require("../models");

// ADD SKILLS
exports.addSkills = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const { skills } = req.body;

    const skillInstances = await Promise.all(
      skills.map(async (name) => {
        const [skill] = await Skill.findOrCreate({ where: { name } });
        return skill;
      })
    );

    await user.addSkills(skillInstances);

    res.json({ msg: "Skills added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: Skill,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};