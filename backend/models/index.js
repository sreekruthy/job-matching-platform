const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const User = require("./user")(sequelize);
const Job = require("./job")(sequelize);
const Skill = require("./skill")(sequelize);
const UserSkill = require("./userSkill")(sequelize);
const JobSkill = require("./jobSkill")(sequelize, Sequelize.DataTypes);
const Application = require("./application")(sequelize);

// RELATIONSHIPS 

// User ↔ Skill (Many-to-Many)
User.belongsToMany(Skill, { through: UserSkill });
Skill.belongsToMany(User, { through: UserSkill });

// Job ↔ Skill (Many-to-Many)
Job.belongsToMany(Skill, { through: JobSkill });
Skill.belongsToMany(Job, { through: JobSkill });

// Recruiter → Jobs (One-to-Many)
User.hasMany(Job, { foreignKey: "created_by" });
Job.belongsTo(User, { foreignKey: "created_by" });

// User ↔ Job (Applications)
User.belongsToMany(Job, { through: Application });
Job.belongsToMany(User, { through: Application });

module.exports = {
  sequelize,
  User,
  Job,
  Skill,
  UserSkill,
  JobSkill,
  Application,
};