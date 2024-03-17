import express from "express";
import mongoose from "mongoose";

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define Schema
const UserSchema = new mongoose.Schema({
  name: String,
  opening_times: {
    Sunday: {
      date: String,
      status: String,
      open: String,
      close: String,
    },
    Monday: {
      date: String,
      status: String,
      open: String,
      close: String,
    },
    Tuesday: {
      date: String,
      status: String,
      open: String,
      close: String,
    },
    Wednesday: {
      date: String,
      status: String,
      open: String,
      close: String,
    },
    Thursday: {
      date: String,
      status: String,
      open: String,
      close: String,
    },
    Friday: {
      date: String,
      status: String,
      open: String,
      close: String,
    },
    Saturday: {
      date: String,
      status: String,
      open: String,
      close: String,
    },
  },
});

const UserModel = mongoose.model("openinghours", UserSchema);

// Get all opening hours
app.get("/getopeninghours", async (req, res) => {
  try {
    const users = await UserModel.find();

    // Arrange opening times starting from the current day
    const today = new Date();
    const currentDayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const sortedOpeningTimes = {};

    for (let i = 0; i < 7; i++) {
      const index = (currentDayIndex + i) % 7;
      const day = daysOfWeek[index];
      users.forEach((user) => {
        const openingTimes = user.opening_times;
        if (!sortedOpeningTimes[day]) {
          sortedOpeningTimes[day] = openingTimes[day];
          sortedOpeningTimes[day].date = formatDate(today, i); // Add date for specific day
        }
      });
    }

    res.json(sortedOpeningTimes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Function to format date for specific day
function formatDate(today, offset) {
  const date = new Date(today);
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
}

// Update the status of opening hours for selected day to "closed" and add date for next week
app.post("/updatesingledaystatus", async (req, res) => {
  try {
    const { day, status, open, close } = req.body;

    // Calculate date for next week
    const nextWeekDate = new Date();
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    const formattedNextWeekDate = nextWeekDate.toISOString().split("T")[0];

    // Find and update the document in the MongoDB collection
    const result = await UserModel.findOneAndUpdate(
      { [`opening_times.${day}`]: { $exists: true } }, // Query to find the document with the specified day
      // Update operation
      {
        $set: {
          [`opening_times.${day}.date`]: formattedNextWeekDate, // Set the date for next week
          [`opening_times.${day}.status`]: status,
          [`opening_times.${day}.open`]: open,
          [`opening_times.${day}.close`]: close,
        },
      }, // Return the modified document
      { new: true }
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: `Opening time not found for ${day}` });
    }

    res.json({
      message: `Status of ${day} updated to ${status} for next week`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/updatesingledaystatus", async (req, res) => {
  try {
    const daysData = req.body;

    // Iterate through each day in the request body
    for (const [day, data] of Object.entries(daysData)) {
      const { date, status, open, close } = data;

      // Find and update the document in the MongoDB collection
      const result = await UserModel.findOneAndUpdate(
        { [`opening_times.${day}`]: { $exists: true } }, // Query to find the document with the specified day
        // Update operation
        {
          $set: {
            [`opening_times.${day}.date`]: date,
            [`opening_times.${day}.status`]: status,
            [`opening_times.${day}.open`]: open,
            [`opening_times.${day}.close`]: close,
          },
        },
        { new: true }
      );

      if (!result) {
        return res
          .status(404)
          .json({ message: `Opening time not found for ${day}` });
      }
    }

    res.json({
      message: `Opening hours updated successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
