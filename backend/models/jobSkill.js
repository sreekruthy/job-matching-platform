module.exports = (sequelize, DataTypes) => {
  const JobSkill = sequelize.define("JobSkill", {}, {
    timestamps: false
  });

  return JobSkill;
};