const dal = require("../dal");



async function getAllUsersAsync() {
  const sql = "SELECT * FROM users";
  const users = await dal.executeAsync(sql);
  return users;
}
async function getOneUserAsync(id) {
  const sql = `SELECT * FROM users WHERE userID = ${id}`;
  const user = await dal.executeAsync(sql);
  return user;
}
async function addUserAsync(user) {
  const sql = `INSERT INTO users ( firstName, lastName, userName, password, isAdmin) VALUES('${user.firstName}','${user.lastName}','${user.userName}','${user.password}',0)`;
  const info = await dal.executeAsync(sql);
  user.id = info.insertId;
  return user;
}
async function isUserExist(username, password) {

  const sql = `SELECT * FROM users WHERE userName = '${username}' AND password = '${password}'`;
  const result = await dal.executeAsync(sql);

  return result;
}
async function getUser(credentials) {
  const sql = `SELECT * FROM users WHERE userName = '${credentials.userName}' AND password = '${credentials.password}'`;
  const result = await dal.executeAsync(sql);
  // improve - send user or password wrong
  if (result.length == 0) {
    return null
  } else {
    if (result[0].userName == undefined || result[0].password == undefined) {
      return null
    }
  }
  // console.log(result[0].userName)
  if (result.isAdmin = 1) {
    console.log("user is admin")
  }
  return result;
}

module.exports = {
  getAllUsersAsync,
  getOneUserAsync,
  addUserAsync,
  isUserExist,
  getUser
};
