require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const signUpRoute = require("./routes/signup");
const volunteerRoute = require("./routes/volunteer");
const pug = require("pug");

//Init app
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use(signUpRoute);
app.use(volunteerRoute);
app.use(express.static("public"));

//Load view engine
app.set("view engine", "pug");
app.set("views", "./views");

//Connected Data Base
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.wk7nx.mongodb.net/donationDB?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      }
    );

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
