
// Initialising express
const router = require("express").Router();

// Initialising main routes

const dashboardRoutes = require("./dashboard");
//const homeRoutes = require("./home");
const apiRoutes = require("./api");

// initiating the following routes

//router.use("/", homeRoutes);
router.use("/", dashboardRoutes);
router.use("/", apiRoutes);

module.exports = router;

