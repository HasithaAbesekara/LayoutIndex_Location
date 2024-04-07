const express = require("express");
const deviceController = require("./../Controllers/deviceController");
const locationController = require("./../Controllers/locationController");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/").post(deviceController.createDevice);
router.route("/").get(deviceController.getAllDevice);

router
  .route("/:id/devices")
  .post(upload.single("image"), deviceController.addDeviceToLocation);

router.route("/:id").delete(deviceController.deletDevice);

module.exports = router;
