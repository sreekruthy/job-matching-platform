const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Application", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "applied",
      allowNull: false,
    },
  },
{
    indexes: [
      { fields: ["UserId"] },
      { fields: ["JobId"] },
    ],

});
};