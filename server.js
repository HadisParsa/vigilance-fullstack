const express = require('express');
const path = require('path');

// Import express-session
const session = require('express-session');
const exphbs = require('express-handlebars');;

const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;



// Listen for connections
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);
