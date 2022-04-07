require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const signUpRoute = require("./routes/signup");

app.use(express.json());
app.use(signUpRoute);

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
