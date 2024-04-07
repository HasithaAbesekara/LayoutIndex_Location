const express = require("express");
const loactionController = require("./../Controllers/locationController");

const router = express.Router();

router.route("/").post(loactionController.createLocation);
router.route("/").get(loactionController.getAllLocation);

router.route("/:id").delete(loactionController.deletLocation);
router.route("/:id/devices").get(loactionController.getDevicesByLocationId);
module.exports = router;
