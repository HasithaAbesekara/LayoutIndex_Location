const Device = require("./../Models/deviceModel");
const Location = require("./../Models/locationModel");
const CoustomError = require("./../utils/CoustomError");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");

exports.createDevice = asyncErrorHandler(async (req, res, next) => {
  const { serialNumber, type, image, status } = req.body;

  const device = await Device.create({
    serialNumber,
    type,
    image,
    status,
  });

  res.status(201).json({
    status: "Succes",
    data: {
      device,
    },
  });
});

exports.getAllDevice = asyncErrorHandler(async (req, res, next) => {
  const device = await Device.find();

  res.status(200).json({
    status: "success",
    length: device.length,
    data: {
      device,
    },
  });
});

exports.deletDevice = asyncErrorHandler(async (req, res, next) => {
  const deletedDevice = await Device.findByIdAndDelete(req.params.id);

  if (!deletedDevice) {
    const error = new CoustomError("Device with that ID is not found!", 404);
    return next(error);
  }

  res.status(204).json({
    status: "Succesfull delete",
    data: null,
  });
});

exports.addDeviceToLocation = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { serialNumber, type, status, image } = req.body;

  // Create the device
  const device = await Device.create({
    serialNumber,
    type,
    image,
    status,
  });

  // Find the location by id
  const location = await Location.findById(id);
  if (!location) {
    const error = new CoustomError("Location with that ID is not found!", 404);
    return next(error);
  }

  // Push the device to the location's devices array
  location.devices.push(device);

  // Save the location
  await location.save();

  res.status(201).json({
    status: "success",
    data: {
      device,
    },
  });
});
