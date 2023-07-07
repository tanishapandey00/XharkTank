const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
//routes
const postRoutes = require("./routes/pitches");
const userRoutes = require("./routes/users");

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/", postRoutes);
app.use("/", userRoutes);

//curb cores error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", async (req, res) => {
  res.send("Started");
});
// const fetchLimit = 500000;
const url = process.env.URL;
// const config = {
//   connectTimeoutMS: 5000,
//   socketTimeoutMS: 5000,
//   useUnifiedTopology: true,
// };
mongoose
  .connect(url, { usenewUrlParser: true })
  .then(console.log("Database COnnected"))

  .catch((err) => console.log(err));
//
// db.once("open", (_) => {
//   console.log("Database connected:", url);
// });

// db.on("error", (err) => {
//   console.error("connection error:", err);
// });
const port = process.env.PORT || 8082;
app.listen(port, (err) => {
  if (err) console.log(err);
});
// serverApp.setTimeout(10 * 1000);
