const dal = require("../data-access-layer/dal");
const vacationsLogic = require("../business-logic-layer/vacations-logic");

//follow function
async function followVacationAsync(follows) {
    const sql = `INSERT INTO follows(userId, vacationId) VALUES (?,?)`;
    const info = await dal.executeAsync(sql, [follows.userId, follows.vacationId]);
    const followVacation = vacationsLogic.getOneVacationsAsync(follows.vacationId);
    return followVacation;
}

async function unfollowVacationAsync(userId, vacationId) {
    const sql = `DELETE FROM follows WHERE userId = ? AND vacationId = ?`;
    await dal.executeAsync(sql, [userId, vacationId]);
    const unfollowVacation = vacationsLogic.getOneVacationsAsync(vacationId);
    return unfollowVacation;
}

module.exports = {
    followVacationAsync,
    unfollowVacationAsync
}