const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));

app.use(express.json());

// Routes
const jobRoutes = require("./routes/jobRoutes");
app.use("/", jobRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Sync database    
const { sequelize } = require("./models");
sequelize.sync().then(() => {
  console.log("Database synced");
});

// Start server
app.listen(5001, () => console.log("Server running on port 5001"));