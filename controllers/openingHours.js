const fs = require("fs");
const UserModel = require("../models/models");

async function getOpeningHours(req, res) {
  try {
    const openingHours = await UserModel.find({}, { opening_times: 1 });

    if (!openingHours) {
      return res.status(404).json({ message: "Opening hours not found" });
    }

    res.json(openingHours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updateSingleDayStatus(req, res) {
  try {
    const { day, date, status, open, close } = req.body;

    const result = await UserModel.findOneAndUpdate(
      { [`opening_times.${day}`]: { $exists: true } },
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

    res.json({
      message: `Opening hours updated successfully for ${day}`,
      updatedOpeningHours: result.opening_times[day],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updateOpeningHours(req, res) {
  try {
    const dataToUpdate = req.body;

    const { _id, name ,opening_times } = dataToUpdate;

    const result = await UserModel.findOneAndUpdate(
      { _id },
      { $set: { name, opening_times } }, 
      { new: true }
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: `Document not found with id: ${_id}` });
    }

    res.json({
      message: "Opening hours updated successfully",
      updatedDocument: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getOpeningHours,
  updateSingleDayStatus,
  updateOpeningHours,
};
