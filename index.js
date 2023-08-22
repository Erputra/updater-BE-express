require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const registerLicencesRoutes = require('./routes/registerLicencesRoutes');
const listEndpoints = require('express-list-endpoints');
const { sequelize, connectDB } = require('./db.config');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(registerLicencesRoutes);

// List and print registered routes
const endpoints = listEndpoints(app);
console.log(endpoints);

app.listen(PORT, async () => {
    console.log(`🚀Server started Successfully on ${PORT}`);
    await connectDB();
    sequelize.sync({ force: false }).then(() => {
      console.log("✅Synced database successfully...");
    });
  });