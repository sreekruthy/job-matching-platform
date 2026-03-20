const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "*", // or frontend url
    credentials: true,
  }));

app.use(express.json());

// Routes
const jobRoutes = require("./backend/routes/jobRoutes");
app.use("/jobs", jobRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Sync database    
const { sequelize } = require("./models");
sequelize.sync({}).then(() => {
  console.log("Database synced");
});

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});