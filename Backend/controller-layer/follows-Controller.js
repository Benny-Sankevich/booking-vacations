const express = require("express");
const followsLogic = require("../business-logic-layer/follows-logic");
const FollowsVacations = require("../models/followsVacations");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const errorHelper = require("../helpers/errors-helper");
const socketHelper = require("../helpers/socket-helper");

const router = express.Router();

// Verify JWT Token: 
router.use(verifyLoggedIn);

//Add new Follow
router.post("/", async (request, response) => {
    try {
        const follow = new FollowsVacations(request.body);
        const error = follow.validatePost();
        if (error) {
            response.status(400).json(error);
            return;
        }
        const newFollowVacation = await followsLogic.followVacationAsync(follow);
        response.status(201).json(newFollowVacation);
        socketHelper.vacationUpdated(newFollowVacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Delete follow
router.delete("/:userId/:vacationId", async (request, response) => {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        const vacationToUpdated = await followsLogic.unfollowVacationAsync(userId, vacationId);
        response.json(vacationToUpdated);
        socketHelper.vacationUpdated(vacationToUpdated);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;