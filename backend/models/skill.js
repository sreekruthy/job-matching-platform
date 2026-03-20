const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Skill", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
};