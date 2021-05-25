const dal = require("../data-access-layer/dal");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

//Get all vacations
async function getAllVacationsAsync() {
    const sql = `SELECT V.vacationId, V.vacationUuid, V.destination, V.description, V.fromDate, V.toDate, V.price, V.imageFileName,
    COUNT(F.vacationId) AS countFollows,
   GROUP_CONCAT(F.userId) AS followers 
    FROM vacations AS V LEFT JOIN follows AS F
    ON V.vacationId = F.vacationId
    GROUP BY V.vacationId
    ORDER BY COUNT(F.vacationId) DESC
    `;
    const vacations = await dal.executeAsync(sql);
    return vacations;
}

//Get one vacation
async function getOneVacationsAsync(vacationId) {
    const sql = `SELECT V.vacationId, V.vacationUuid, V.destination, V.description, V.fromDate, V.toDate, V.price, V.imageFileName,
    COUNT(F.vacationId) AS countFollows,
   GROUP_CONCAT(F.userId) AS followers 
    FROM vacations AS V LEFT JOIN follows AS F
    ON V.vacationId = F.vacationId
    WHERE v.vacationId = ${vacationId}
    GROUP BY V.vacationId
    `;
    const vacation = await dal.executeAsync(sql);
    return vacation[0];
}

//Add vacation
async function addVacationAsync(vacation, image) {
    //image types
    const regex = /\.(gif|jpg|jpeg|tiff|png|ico|xbm|tif|svgz|jif|svg|jfif|webp|bmp|pjpeg|avif)$/i;
    //check extension is type image and have image
    if (image && !path.extname(image.name).match(regex) || !image) return null;

    vacation.vacationUuid = uuid.v4();

    let newImageName = "";
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        newImageName = uuid.v4() + extension;
        await image.mv("./upload/" + newImageName);
    }

    const sql = `INSERT INTO vacations(vacationId, vacationUuid, destination, description, fromDate, toDate, price,imageFileName) VALUES(DEFAULT,?, ?,?,?,?,?,?)`;
    const info = await dal.executeAsync(sql, [vacation.vacationUuid, vacation.destination, vacation.description, vacation.fromDate, vacation.toDate, vacation.price, newImageName]);
    vacation.vacationId = info.insertId;
    vacation.imageFileName = newImageName;
    return vacation;
}

// Update all data of vacation
async function updateFullVacationDataAsync(vacation, image) {
    //Get old data from database
    const sqlImage = `SELECT vacationId, imageFileName FROM  vacations WHERE vacationUuid = ?`;
    const vacationData = await dal.executeAsync(sqlImage, [vacation.vacationUuid]);
    vacation.imageFileName = vacationData[0].imageFileName;
    vacation.vacationId = vacationData[0].vacationId;

    //image types
    const regex = /\.(gif|jpg|jpeg|tiff|png|ico|xbm|tif|svgz|jif|svg|jfif|webp|bmp|pjpeg|avif)$/i;

    if (image) {
        //check extension is type image
        if (image && !path.extname(image.name).match(regex)) return null;

        //Delete old image
        await fs.unlinkSync("./upload/" + vacation.imageFileName);

        //Save new image
        let newImageName = "";
        const extension = image.name.substr(image.name.lastIndexOf("."));
        newImageName = uuid.v4() + extension;
        await image.mv("./upload/" + newImageName);
        vacation.imageFileName = newImageName;
    }
    const sql = `UPDATE vacations SET destination=?, description=?, fromDate=?, toDate=?, price=?, imageFileName=? WHERE vacationUuid = '${vacation.vacationUuid}'`;
    const info = await dal.executeAsync(sql, [vacation.destination, vacation.description, vacation.fromDate, vacation.toDate, vacation.price, vacation.imageFileName]);

    vacation = await getOneVacationsAsync(vacation.vacationId)
    return info.affectedRows === 0 ? null : vacation;
}

async function deleteVacationAsync(vacationUuid) {

    //Delete image
    const sqlImage = `SELECT imageFileName FROM  vacations WHERE vacationUuid = ?`;
    const vacationData = await dal.executeAsync(sqlImage, [vacationUuid]);

    if (vacationData[0].imageFileName) {
        await fs.unlinkSync("./upload/" + vacationData[0].imageFileName);
    }

    //Delete Data From DB
    const sql = `DELETE FROM vacations WHERE vacationUuid = ?`;
    await dal.executeAsync(sql, [vacationUuid]);
}

module.exports = {
    getAllVacationsAsync,
    getOneVacationsAsync,
    addVacationAsync,
    updateFullVacationDataAsync,
    deleteVacationAsync
}