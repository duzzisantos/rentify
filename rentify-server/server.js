const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const SignUp = require("./models/user_model");
const bcrypt = require("bcryptjs");
const methodOverride = require("method-override")
// server and database configurations
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:4000",
};

//s*8#e%^#c*/u65)r(_+i@#t*/*/(y@^& parameters

app.use(cors(corsOptions));
app.use(express.json());
app.use(methodOverride())
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "http://localhost:3000/"],
      objectSrc: ["'none'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(helmet.crossOriginEmbedderPolicy());
app.use(
  helmet.referrerPolicy({
    options: "no referrer",
  })
);

//this setting tells browsers to prefer https: (secure) over http (insecure):
app.use(
  helmet.hsts({
    maxAge: 15552000,
    preload: true,
    includeSubDomains: false,
  })
);

app.use(helmet.noSniff()); //mitigates data sniffing by hackers
app.use(helmet.xssFilter()); //prevents cross-site scripting

//USER ACCOUNT HTTP REQUESTS BEGIN HERE

app.get("/", (req, res) => {
  res.json({
    Message: "This is a fullstack rental application project",
    Author: "Duzie Uche-Abba",
  });
});

app.get("/signup", (req, res) => {
  res.json({ message: "This route is for signing up." });
});
app.post("/signup", (req, res) => {
  res.redirect("/login");
  if (req.user) {
    var redir = { redirect: "/" };
    return res.json(redir);
  } else {
    var redir2 = { redirect: "/login" };
    res.send({ message: "I have been redirected to login" });
    console.log("Successfully signed up");
    return res.json(redir2);
  }
});

app.get("/login", (req, res) => {
  res.json({ message: "This route is for signing in." });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await SignUp.findOne({ username });
  const validated = await bcrypt.compare(password, user.password);
  if (validated) {
    res.send("Welcome");
    console.log("Thanks for logging in")
    res.redirect("/home");
  }
  // res.redirect("/home");
  else if (req.user) {
    var redir = { redirect: "/" };
    res.json(redir);
  } else {
    var redir2 = { redirect: "/home" };
    res.json(redir2);
  }
});

// USER ACCOUNT HTTP REQUESTS end here

//THE API ROUTES
require("./routes/admin_route")(app);
require("./routes/user_route")(app);
require("./routes/booking_route")(app)

//connection credentials

const PORT = 4000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log("LISTENING TO PORT", PORT);
  } else {
    console.log(err);
  }
});
