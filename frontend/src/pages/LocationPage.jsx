import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import Toast, { showSuccessToast, showErrorToast } from "./../Toast/Toast";
// import locationss from "../Data/location";
// import LocationAddForm from "./LocationAddForm";

const LocationPage = () => {
  const [locationss, setLocations] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/location"
        );

        setLocations(response.data.data.locations);
        console.log(response.data.data.locations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleLocationAdded = (newLocation) => {
  //   setLocations([...locationss, newLocation]); // Add the new location to the existing location data
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRemove = async (locationId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/location/${locationId}`
      );
      if (response.status === 204) {
        setLocations(
          locationss.filter((location) => location._id !== locationId)
        );
      } else {
        throw new Error("Failed to delete location");
      }
      showSuccessToast("Location removed successfully.");
    } catch (error) {
      console.error("Error deleting location:", error.message);
      showErrorToast("Failed to remove Location.");
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
      <Typography variant="h4" gutterBottom>
        Location Register Form
      </Typography>
      <Button
        component={Link}
        to={"/addLocation"}
        variant="contained"
        style={{ padding: "10px", margin: "10px", marginLeft: "-1px" }}
      >
        Add Location
      </Button>
      <Toast />
      {/* <TableContainer component={Paper}> */}
      <TableContainer component={Paper}>
        <Table aria-label="location table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "gray",
              }}
            >
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Devices</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? locationss.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : locationss
            ).map((location, index) => (
              <TableRow key={index}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.address}</TableCell>
                <TableCell>{location.phone}</TableCell>

                <TableCell>
                  <Button
                    component={Link}
                    to={`/location/${location._id}`}
                    variant="contained"
                  >
                    View Location
                  </Button>
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
                    onClick={() => handleRemove(location._id)}
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
        count={locationss.length}
        component="div"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <LocationAddForm onAddLocation={handleLocationAdded} /> */}
    </div>
  );
};

export default LocationPage;
