const express = require("express");
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const Vacation = require("../models/vacationsModels");
const path = require("path");
const verifyIsAdmin = require("../middleware/verify-isAdmin");
const errorHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const socketHelper = require("../helpers/socket-helper");

const router = express.Router();

// Get All vacations
router.get("/", verifyLoggedIn, async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// Get Image vacation
router.get("/images/:imageName", (request, response) => {
    const imageName = request.params.imageName;
    let reqPath = path.join(__dirname, "../");
    response.sendFile(reqPath + "/upload/" + imageName);
});

//Add new vacation
router.post("/", verifyIsAdmin, async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        const error = vacation.validatePost();
        if (error) {
            response.status(400).json(error);
            return;
        }
        const adedVacation = await vacationsLogic.addVacationAsync(vacation, (request.files ? request.files.myImage : null));
        if (!adedVacation) return response.status(400).send("Image doesn't exist or wrong file has been send");
        response.status(201).json(adedVacation);
        socketHelper.vacationAdded(adedVacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Update All data of vacation
router.put("/:vacationUuid", verifyIsAdmin, async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        vacation.vacationUuid = request.params.vacationUuid;
        const error = vacation.validatePut();
        if (error) {
            response.status(400).json(error);
            return;
        }
        const vacationUpdated = await vacationsLogic.updateFullVacationDataAsync(vacation, (request.files ? request.files.myImage : null));
        if (!vacationUpdated) {
            response.status(404).json(`Vacation not found or wrong file has been send.`);
            return;
        }
        response.json(vacationUpdated);
        socketHelper.vacationUpdated(vacationUpdated);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Delete vacation
router.delete("/:vacationUuid", verifyIsAdmin, async (request, response) => {
    try {
        const uuid = request.params.vacationUuid;
        await vacationsLogic.deleteVacationAsync(uuid);
        response.sendStatus(204);
        socketHelper.vacationDeleted(uuid);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;