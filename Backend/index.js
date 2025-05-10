require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors"); // Import CORS package
const mongoose = require("mongoose");
const adityaRoutes = require("./Routes/adityaRoutes");
const homeFirstBankRoutes = require("./Routes/homeFirstBankRoutes");
const iciciBankRoutes = require("./Routes/iciciBankRoutes");
const piramalRoutes = require("./Routes/piramalRoute");
const icichfcRoutes = require("./Routes/iciciHFCRoute")
const SamstaflnRoute = require("./Routes/SamstaflnRoute");
const FedralRoute = require("./Routes/FedralRoute");
const ProtiumRoute = require("./Routes/ProtiumRoute")
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000; // Hardcoded port

// Hardcoded MongoDB URI (replace with your actual credentials)
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Middleware
app.use(cors());
app.use(express.json());
// Use CORS middleware to allow requests from different origins
app.use(bodyParser.json()); // Use bodyParser to handle JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser to handle form data

// Routes

app.use("/api/aditya", adityaRoutes);
app.use("/api/first-bank", homeFirstBankRoutes);
app.use("/api/icici-bank", iciciBankRoutes);
app.use("/api/piramal", piramalRoutes);
app.use("/api/icichfc", icichfcRoutes) // Add this line to include piramalRoutes
app.use("/api/samstafln", SamstaflnRoute)
app.use("/api/fedral", FedralRoute );
app.use("/api/protium", ProtiumRoute)
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
