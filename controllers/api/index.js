// Initialising express
const router = require("express").Router();

// Initialising main routes

const userRoutes = require("./userRoutes");

// initiating the following routes

router.use("/", userRoutes);

module.exports = router;
