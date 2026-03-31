const express = require("express");
const router = express.Router();
const Capture = require("../models/Capture");
const { protect: auth } = require("../middleware/auth");
const cloudinary = require("../config/cloudinary");

router.post("/", auth, async (req, res) => {
  try {
    const { studentCount, imageBase64 } = req.body;

    // Use user-provided Cloudinary snippet logic with added safe timeout to prevent 499 errors
    const upload = await cloudinary.uploader.upload(imageBase64, {
      folder: "attendance",
      timeout: 120000
    });

    const capture = new Capture({
      studentCount,
      imageUrl: upload.secure_url,
      admin: req.user.id,
      createdAt: new Date()
    });

    await capture.save();

    res.json(capture);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Capture upload failed" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const captures = await Capture.find({ admin: req.user.id })
      .sort({ createdAt: -1 });

    res.json(captures);

  } catch (error) {
    console.error("Failed to fetch captures:", error);
    res.status(500).json({ message: "Failed to fetch captures" });
  }
});

module.exports = router;