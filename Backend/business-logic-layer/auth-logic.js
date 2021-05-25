const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const uuid = require("uuid");
const jwtHelper = require("../helpers/jwt-helper");

//Register Function 
async function registerAsync(user) {

    //Check if Username already exists
    const sql = "SELECT username FROM users WHERE username = ? ";
    const username = await dal.executeAsync(sql, [user.username]);
    // if  Username doesn't exist
    if (!username.length) {
        // Hash user password: 
        user.password = cryptoHelper.hash(user.password);
        user.uuid = uuid.v4();

        const sql = "INSERT INTO users VALUES(DEFAULT,?, ?, ?, ?, ?,DEFAULT)";

        const info = await dal.executeAsync(sql, [user.uuid, user.firstName, user.lastName, user.username, user.password]);
        user.userId = info.insertId;

        // Delete the old password: 
        delete user.password;

        user.token = jwtHelper.getNewToken({ user });

        user.isAdmin = 0;

        return user;
    }
    //if Username already exists
        return null;
}

//Login Function
async function loginAsync(credentials) {

    // Hash user password: 
    credentials.password = cryptoHelper.hash(credentials.password);

    // Solve SQL injection by sending sql + values:
    const sql = "SELECT userId, uuid, firstName, lastName, username, isAdmin FROM users WHERE username = ? AND password = ?";

    const users = await dal.executeAsync(sql, [credentials.username, credentials.password]);
    if (users.length === 0) return null;
    const user = users[0];

    user.token = jwtHelper.getNewToken({ user });

    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};