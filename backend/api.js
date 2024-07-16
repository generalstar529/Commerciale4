const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
require("./db");

const app = express();
app.use(express.json({ limit: "10mb" }));

const companiesRouter = require("./routes/companies");
const adminRouter = require("./routes/admin");

app.use("/.netlify/functions/api/companies", companiesRouter); // path must route to lambda
app.use("/.netlify/functions/api/admin", adminRouter);
app.use("/.netlify/functions/api/init", (req, res) => {
    res.json("--- Initialized ---");
});

module.exports = app;
module.exports.handler = serverless(app);
