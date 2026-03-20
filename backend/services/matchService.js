const { User, Job, Skill } = require("../models");

exports.matchJobs = async (userId) => {
  const user = await User.findByPk(userId, { include: Skill });
  const jobs = await Job.findAll({ include: Skill });

  const userSkills = user.Skills.map((s) => s.name);

  const results = jobs.map((job) => {
    const jobSkills = job.Skills.map((s) => s.name);

    let matchCount = 0;

    jobSkills.forEach((skill) => {
      if (userSkills.includes(skill)) {
        matchCount++;
      }
    });

    const score =
      jobSkills.length === 0
        ? 0
        : (matchCount / jobSkills.length) * 100;

    return {
      jobId: job.id,
      title: job.title,
      score: Math.round(score),
      matchedSkills: matchCount,
      totalSkills: jobSkills.length,
    };
  });

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
};