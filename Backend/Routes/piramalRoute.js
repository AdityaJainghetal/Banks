const express = require("express");
const router = express.Router();
const piramalController = require("../controllers/piramalController");

// CRUD routes
router.post("/create", piramalController.createDetails);
router.get("/display", piramalController.getAllDetailss);
router.get("/display/:id", piramalController.getDetailsById);
router.put("/update/:id", piramalController.updateDetails);
router.delete("/delete/:id", piramalController.deleteDetails);

// Search route
router.get("/search/search", piramalController.searchDetailss);

module.exports = router;
