const express = require("express");
const connectMongodb = require("./connection");
const userRouter = require("./routes/routes");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongodb()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.use("/", userRouter);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Atlas connection error:", err);
  });

module.exports = app;
