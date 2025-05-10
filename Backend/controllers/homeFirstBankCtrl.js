const ValuationReport = require("../model/homeFirstModel");

// Create a new valuation report
exports.createValuationReport = async (req, res) => {
  try {
    const newReport = new ValuationReport(req.body);
    const savedReport = await newReport.save();
    res.status(201).json({
      success: true,
      message: "Valuation report created successfully",
      data: savedReport,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating valuation report",
      error: error.message,
    });
  }
};

// Get all valuation reports
exports.getAllValuationReports = async (req, res) => {
  try {
    const reports = await ValuationReport.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching valuation reports",
      error: error.message,
    });
  }
};

// Get a single valuation report by ID
exports.getValuationReportById = async (req, res) => {
  try {
    const report = await ValuationReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Valuation report not found",
      });
    }
    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching valuation report",
      error: error.message,
    });
  }
};
