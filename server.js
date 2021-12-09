
// Dependencies
const express = require('express');
// Import express-handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');

const routes = require('./controllers');


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Describe what the following two lines of code are doing.
// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(require('./controllers/routes'));

app.get('/', async (req, res) => {
    res.render('all');
});  

// Starts the server to begin listening
app.listen(PORT, () => {
    console.info(`Example app listening at http://localhost:${PORT} 🚀`);
});
