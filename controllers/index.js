// Initialising express
const router = require("express").Router();

// Initialising main routes

const homeRoutes = require("./homeRoutes");
//const homeRoutes = require("./home");
const apiRoutes = require("./api");

// initiating the following routes

//router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);


module.exports = router;

