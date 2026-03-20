const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/jobs", require("./routes/jobRoutes"));

const PORT = process.env.PORT || 5001;

sequelize.sync().then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed ", err);
  });