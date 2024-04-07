const locations = [
  {
    id: 1,
    name: "Location A",
    address: "123 Main St",
    phone: "123-456-7890",
    devices: [
      {
        id: 1,
        serialNumber: "ABC123",
        type: "pos",
        image: "https://example.com/device1.jpg",
        status: "active",
      },
      {
        id: 2,
        serialNumber: "XYZ456",
        type: "kiosk",
        image: "https://example.com/device2.jpg",
        status: "inactive",
      },
    ],
  },
  {
    id: 2,
    name: "Location B",
    address: "456 Elm St",
    phone: "987-654-3210",
    devices: [
      {
        id: 3,
        serialNumber: "DEF789",
        type: "signage",
        image: "https://example.com/device3.jpg",
        status: "active",
      },
    ],
  },
  // Add more locations as needed
];

export default locations;
