const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
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
  origin: "https://desolate-shore-41320.herokuapp.com/",
};

//security parameters

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
      scriptSrc: ["'self'", "https://rentifye.netlify.app/"],
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
