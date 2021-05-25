global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const vacationsController = require("./controller-layer/vacations-Controller");
const authController = require("./controller-layer/auth-Controller");
const followsController = require("./controller-layer/follows-Controller")
const imageUpload = require("express-fileupload");
const socketHelper = require("./helpers/socket-helper");
const path = require("path");

const server = express();
server.use(cors());
server.use(imageUpload());
server.use(express.json());
//Serve index.html from the root
server.use(express.static(path.join(__dirname, "./frontend")));

//Routing
server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);
server.use("/api/follows", followsController);

server.use("*", (request, response) => {
    if (process.env.NODE_ENV === "production") {
        response.sendFile(path.join(__dirname, "./frontend/index.html"));
    }
    else {
        response.status(404).send("Route not found");
    }
});

//set port to production or development
const port = process.env.PORT || 3001;
const expressListener = server.listen(port, () => console.log("Listening......"));
socketHelper.init(expressListener);