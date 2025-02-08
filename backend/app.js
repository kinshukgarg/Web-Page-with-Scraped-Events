require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");
const emailRoutes = require("./routes/emailRoutes");
const scrapeEvents = require("./scraper/scrapeEvents");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/events", eventRoutes);
app.use("/api/subscribe", emailRoutes);

// Schedule the scraper to run every 24 hours
cron.schedule("0 0 * * *", async () => {
    console.log("Running scheduled event scraper...");
    await scrapeEvents();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
