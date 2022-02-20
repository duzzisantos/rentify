if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

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

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    Message: "This is a fullstack rental application project",
    Author: "Duzie Uche-Abba",
  });
});

// app.post("/", (req, res) => {
//   res.json({ Message: "Successfully posted an entry to the database!" });
//   res.send(req.body);
// });

require("./routes/admin_route")(app);

const PORT = 4000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log("LISTENING TO PORT", PORT);
  } else {
    console.log(err);
  }
});
