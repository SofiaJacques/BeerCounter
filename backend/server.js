//anything that is imported here can be used throughout the application

const express = require("express");
const colors = require("colors");
const { connect } = require("mongoose");
const dotenv = require("dotenv").config(); //allows to have dotenv file with our variables in it
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tables", require("./routes/tableRoutes"));
app.use("/api/crates", require("./routes/crateRoutes"));
app.use("/api/people", require("./routes/peopleRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
