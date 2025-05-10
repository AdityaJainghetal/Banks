const express = require("express");
const router = express.Router();
const homeFirstBank = require("../controllers/homeFirstBankCtrl");

// Create a new valuation report
router.post("/", homeFirstBank.createValuationReport);

// Get all valuation reports
router.get("/", homeFirstBank.getAllValuationReports);

// Get a single valuation report by ID
router.get("/:id", homeFirstBank.getValuationReportById);

module.exports = router;
