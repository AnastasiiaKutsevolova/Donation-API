require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Route Files
const authRoute = require("./routes/auth");
const volunteerRoute = require("./routes/volunteer");
const userRoute = require("./routes/user");

//Init app
const app = express();
const port = 3003 || process.env.PORT;

//Use Routes middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(authRoute);
app.use(volunteerRoute);
app.use(userRoute);

//Connected Data Base
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.wk7nx.mongodb.net/donationDB?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
