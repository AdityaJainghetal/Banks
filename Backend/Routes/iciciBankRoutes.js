const express = require("express");
const router = express.Router();
const {
  createIciciBank,
  getAllIciciBanks,
  getIciciBankById,
} = require("../controllers/iciciBankController");

router.post("/", createIciciBank); // Create

router.get("/", getAllIciciBanks); // Get all

router.get("/:id", getIciciBankById); // Get by ID

module.exports = router;
