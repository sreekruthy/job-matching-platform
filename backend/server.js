const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/jobs", require("./routes/jobRoutes"));

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running...");
  });
});