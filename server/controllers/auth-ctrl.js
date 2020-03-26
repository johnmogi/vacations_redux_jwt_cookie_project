const express = require("express");
const usersLogic = require("../business-logic/auth-logic");
const router = express.Router();



// GET http://localhost:3000/api/users
router.get("/users", async (request, response) => {
  try {
    const users = await usersLogic.getAllUsersAsync();
    response.json(users);
  } catch (err) {
    response.status(500).send(err.message);
  }
});


router.post("/login", async (request, response) => {
  try {
    const credentials = request.body;
    const user = await usersLogic.getUser(credentials);


    if (!user) {
      response.status(401).send("Incorrect username or password");
      return;
    }
    request.session.isLoggedIn = true;
    request.session.role = user.role;
    response.json(user);

  }
  catch (err) {
    response.status(500).send(err.message);
  }
});
module.exports = router;
