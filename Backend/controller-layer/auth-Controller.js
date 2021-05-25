const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const User = require("../models/usersModels");
const errorHelper = require("../helpers/errors-helper");

const router = express.Router();

//Add new user
router.post("/register", async (request, response) => {
    try {
        const user = new User(request.body);
        const error = user.validatePost();
        if (error) {
            response.status(400).json(error);
            return;
        }
        const addedUser = await authLogic.registerAsync(user);
        response.status(201).json(addedUser);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});
//Login user
router.post("/login", async (request, response) => {
    try {
        const user = new User(request.body);
        const error = user.validateLogin();
        if (error) {
            response.status(400).json(error);
            return;
        }
        const loggedInUser = await authLogic.loginAsync(user);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;