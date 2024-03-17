const express = require("express");
const fs = require("fs");
const {
  getOpeningHours,
  updateSingleDayStatus,
  updateOpeningHours,
} = require("../controllers/openingHours");

const router = express.Router();

router.get("/getopeninghours", getOpeningHours);
router.post("/updatesingledaystatus", updateSingleDayStatus);
router.put("/updateOpeningHours", updateOpeningHours);

module.exports = router;
