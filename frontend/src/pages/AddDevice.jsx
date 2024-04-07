// AddDeviceForm.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Input,
  MenuItem,
  Select,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDeviceForm = ({ onSubmit }) => {
  const { id } = useParams();

  const [serialNumber, setSerialNumber] = useState("");
  const [type, setType] = useState("pos");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/location/${id}/devices`,
        {
          serialNumber,
          type,
          status,
          image: image ? image.name : null, // Assuming you're sending the image name
        }
      );
      navigate(`/location/${id}`);

      console.log("Device added:", response.data);
      onSubmit(response.data.data.device);
      setSerialNumber("");
      setType("pos");
      setStatus("active");
      setImage(null);
    } catch (error) {
      console.error("Error adding device:", error);
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
        <Typography variant="h5" gutterBottom>
          Add Device
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Serial Number"
                variant="outlined"
                fullWidth
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Type</Typography>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                variant="outlined"
                label="Type"
              >
                <MenuItem value="pos">POS</MenuItem>
                <MenuItem value="kiosk">Kiosk</MenuItem>
                <MenuItem value="signage">Signage</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Status</Typography>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                variant="outlined"
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Upload Image</Typography>
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add Device
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddDeviceForm;
