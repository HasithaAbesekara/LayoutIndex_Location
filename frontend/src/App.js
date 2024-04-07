import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LocationPage from "./pages/LocationPage";
import LocationAddForm from "./pages/LocationAddForm";
import LocationTable from "./pages/DevicePage";
import AddDeviceForm from "./pages/AddDevice";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LocationPage />} />
        <Route path="/addLocation" element={<LocationAddForm />} />
        <Route path="/location/:id" element={<LocationTable />} />
        <Route path="/addDevice/:id" element={<AddDeviceForm />} />
      </Routes>
    </div>
  );
}

export default App;
