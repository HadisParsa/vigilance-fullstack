const router = require('express').Router();

//make the data
const apiRoutes = require('./api');
//make the page
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
