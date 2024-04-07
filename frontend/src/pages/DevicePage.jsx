import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
// import locations from "../Data/location";
import axios from "axios";
import Toast, { showSuccessToast, showErrorToast } from "./../Toast/Toast";

const LocationTable = () => {
  const { id } = useParams();

  // const location = locations.find((loc) => loc.id === parseInt(id));
  const [devices, setDevices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/location/${id}/devices`
        );

        setDevices(response.data.data.devices);
        console.log(response.data.data.devices);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // const handleLocationAdded = (newDevice) => {
  //   setDevices([...devices, newDevice]); // Add the new location to the existing location data
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRemoveDevice = async (deviceId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/device/${deviceId}`);

      setDevices(devices.filter((device) => device._id !== deviceId));
      showSuccessToast("Device removed successfully.");
    } catch (error) {
      console.error("Error removing device:", error);
      showErrorToast("Failed to remove device.");
    }
  };
  return (
    <div
      style={{
        padding: "20px",
        margin: "20px",
        backgroundColor: "ButtonShadow",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {/* Devices for {location.name} */}
      </Typography>
      <Button
        component={Link}
        to={`/addDevice/${id}`}
        variant="contained"
        color="primary"
        style={{ padding: "10px", margin: "10px", marginLeft: "-1px" }}
      >
        Add Device
      </Button>
      <Button
        component={Link}
        to={"/"}
        variant="contained"
        color="success"
        style={{ padding: "10px", margin: "10px", marginLeft: "-1px" }}
      >
        Home
      </Button>
      <Toast />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "gray",
              }}
            >
              <TableCell>Serial Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Image</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? devices.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : devices
            ).map((device, index) => (
              <TableRow key={index}>
                <TableCell>{device.serialNumber}</TableCell>
                <TableCell>{device.type}</TableCell>
                <TableCell
                  style={{
                    color: device.status === "active" ? "green" : "red",
                  }}
                >
                  {device.status}
                </TableCell>
                <TableCell>
                  <img
                    src={device.image}
                    alt={device.image}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      marginTop: "10px",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    style={{
                      padding: "10px",
                      margin: "10px",
                      marginLeft: "-1px",
                    }}
                    onClick={() => handleRemoveDevice(device._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        rowsPerPage={rowsPerPage}
        page={page}
        count={devices.length}
        component="div"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default LocationTable;
