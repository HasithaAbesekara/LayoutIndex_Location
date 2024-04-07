const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    // console.log(conn);
    console.log("DB connection Succusfull");
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Server has Started");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandel rejection occured shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
