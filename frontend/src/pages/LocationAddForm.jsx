import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Toast, { showSuccessToast, showErrorToast } from "./../Toast/Toast";

const LocationAddForm = ({ onAddLocation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/location",
        {
          name,
          address,
          phone,
        }
      );

      console.log("Location added:", response.data);

      onAddLocation(response.data.data.location);
      setName("");
      setAddress("");
      setPhone("");
      showSuccessToast("Location added successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error adding location:", error);
      showErrorToast("Failed to add Location.");
    }
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    // Regex pattern to match phone numbers with a length up to 10 characters
    const phoneRegex = /^\d{0,10}$/;
    if (phoneRegex.test(inputPhone)) {
      setPhone(inputPhone);
    }
  };
  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        backgroundColor: "gray",
        padding: "20px",
      }}
    >
      <Paper style={{ padding: "20px" }}>
        <Toast />
        <Typography variant="h5" gutterBottom>
          Add Location
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={handlePhoneChange} // Use custom change handler
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                label="Devices (comma-separated)"
                variant="outlined"
                fullWidth
                value={devices}
                onChange={(e) => setDevices(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ padding: "10px", margin: "10px", marginLeft: "-1px" }}
              >
                Add Location
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
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LocationAddForm;
