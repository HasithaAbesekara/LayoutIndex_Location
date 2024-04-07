const Loaction = require("./../Models/locationModel");
const Device = require("./../Models/deviceModel");
const CoustomError = require("./../utils/CoustomError");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");

exports.getAllLocation = asyncErrorHandler(async (req, res, next) => {
  const locations = await Loaction.find();

  res.status(200).json({
    status: "success",
    length: locations.length,
    data: {
      locations,
    },
  });
});

exports.createLocation = asyncErrorHandler(async (req, res, next) => {
  const location = await Loaction.create(req.body);
  res.status(201).json({
    status: "Succes",
    data: {
      location,
    },
  });
});

exports.deletLocation = asyncErrorHandler(async (req, res, next) => {
  const deletedLocation = await Loaction.findByIdAndDelete(req.params.id);

  if (!deletedLocation) {
    const error = new CoustomError("Location with that ID is not found!", 404);
    return next(error);
  }
  res.status(204).json({
    status: "Succesfull delete",
    data: null,
  });
});

exports.getDevicesByLocationId = async (req, res) => {
  try {
    const location = await Loaction.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        status: "error",
        message: "Location not found",
      });
    }

    const deviceIds = location.devices;

    const devices = await Device.find({ _id: { $in: deviceIds } });

    res.status(200).json({
      status: "success",
      data: {
        devices,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
