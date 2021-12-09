// Initialising express
const router = require("express").router();

// Initialising main routes

const userRoutes = require("./user");
const postRoutes = require("./post");
const commentRoutes = require("./comment");
const fireBase = require("./firebase");

// initiating the following routes

router.use("/", userRoutes);
router.use("/", postRoutes);
router.use("/", commentRoutes);
router.use("/", fireBase);

module.exports = router;
