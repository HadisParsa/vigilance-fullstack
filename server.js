
// Dependencies
const express = require('express');
// Import express-handlebars
const exphbs = require('express-handlebars');

const path = require('path');
const session = require('express-session');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Describe what the following two lines of code are doing.
// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(require('./controllers/routes'));

app.use(routes)

// Starts the server to begin listening
app.listen(PORT, () => {
    console.info(`Listening at http://localhost:${PORT} 🚀`);
});
