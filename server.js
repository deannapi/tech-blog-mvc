const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Assign Handlebars as the tempate engine
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Add HTML cookies library
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "alphadog",
  cookie: { expires: 15 * 60 * 1000 },
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
