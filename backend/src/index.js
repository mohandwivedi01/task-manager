import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
