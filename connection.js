const mongoose = require("mongoose");

async function connectMongodb() {
  try {
    await mongoose.connect(
      "mongodb+srv://thapabishal21dev:phks9HgnVPn9YL8m@cluster0.onrywyu.mongodb.net/computershop",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connectMongodb;
