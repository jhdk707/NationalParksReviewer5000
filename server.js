// import modules and routes
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

// import connection to sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine instance with custom helpers
const hbs = exphbs.create({
  helpers,
  partialsDir: path.join(__dirname, "views/partials"),
});

const sess = {
  secret: "Super secret secret",
  cookie: { maxAge: 300000, httpOnly: true, secure: false, sameSite: "strict" },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//import BULMA for css styling on handlebars templates
app.use("/bulma", express.static(__dirname + "/node_modules/bulma/css/"));

app.get("/burger.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(__dirname + "/public/js/burger.js");
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Use the routes
app.use("/", routes);
// app.use("/api/signup", signupRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});

app.set("Content-Type", "text/javascript");
