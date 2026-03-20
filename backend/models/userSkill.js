module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "UserSkill",
    {},
    {
      timestamps: false,
      indexes: [
        { fields: ["UserId"] },
        { fields: ["SkillId"] },
        {
          unique: true,
          fields: ["UserId", "SkillId"], // prevent duplicates
        },
      ],
    }
  );
};