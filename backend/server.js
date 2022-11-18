const data = "../data/data.json";

const express = require("express");
const dotenv = require("dotenv").config(); //allows to have dotenv file with our variables in it
const port = process.env.PORT || 5000;

const app = express();

app.use("/api/tables", require("./routes/beerRoutes"));

app.listen(port, () => console.log(`server started on port ${port}`));
