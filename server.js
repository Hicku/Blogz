const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const sequelize = require("./config/connection");
const hbs = exphbs.create({});

const session = require("express-session");
const User = require("./models/User");
const routes = require("./controllers");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require("./controllers/all-routes"));
app.use(require("./controllers/register-routes"));
app.use(require("./controllers/login-routes"));

// Connects to DB & starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  console.log("Database connected!");
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});


module.exports = app;
