module.exports = (sequelize, DataTypes) => {
  const JobSkill = sequelize.define("JobSkill", {}, {
    timestamps: false,
    indexes: [
      { fields: ["JobId"] },
      { fields: ["SkillId"] },
      {
        unique: true,
        fields: ["JobId", "SkillId"], // prevent duplicates
      },
    ],
  });

  return JobSkill;
};