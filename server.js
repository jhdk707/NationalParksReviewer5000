// import modules and routes
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
// const signupRoutes = require("./controllers/api/signupRoutes.js");
const helpers = require("./utils/helpers");

// import connection to sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine instance with custom helpers
const hbs = exphbs.create({
  helpers,
  // extname: ".hbs",
  // defaultLayout: "main",
  // layoutsDir: path.join(__dirname, "views/layouts"),
  // partialsDir: path.join(__dirname, "views/partials"),
});

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Use the routes
app.use("/", routes);
// app.use("/api/signup", signupRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});

// // Serve the index.js file to the client
// app.get("/index.js", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "js", "index.js"));
// });

app.set("Content-Type", "text/javascript");
