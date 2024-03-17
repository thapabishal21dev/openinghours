const express = require("express");
const fs = require("fs");
const {
  getOpeningHours,
  updateSingleDay,
  updateAllDays,
} = require("../controllers/openingHours");

const router = express.Router();

router.get("/getopeninghours", getOpeningHours);
router.post("/updatesingleday", updateSingleDay);
router.put("/updatealldays", updateAllDays);

module.exports = router;
