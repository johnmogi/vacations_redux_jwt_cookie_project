const express = require("express");
const router = express.Router();
const dal = require("./dal");




// Log-in: http://localhost:3003/api/auth/login
router.post("/login", async (request, response) => {

    const user =  request.body 
    // const sql = `SELECT * FROM users WHERE userName = '${user.username}' AND password = '${user.password}'`;
    const sql = `SELECT * FROM users WHERE userName = '${user.userName}' AND password = '${user.password}'`;
    
    try {
        const result = await dal.executeAsync(sql);
        console.log(result)
  const res = JSON.stringify(result)

  if (res.length != 1){
   request.session.loggedin = true
      console.log( request.session.loggedin)
      response
      .status(201)
      .json(result)
  }
  else{
    console.log("try again")
    response.status(403).send(err);

  }
//   if (res.length ){
//     console.log("User is correct")
//       throw "User is correct"
//   }

      // const user = await authLogic.isUserExist(username, password);
    //    const userCheck = await authLogic.isUserExist(user);

//   if (!request.session.loggedin) {
//     response.status(403).send("Access Denied! Please Log-In!");
//     return;
//   }
//   if (result.isAdmin == 1){
//   throw "User is admin"
//   }
     
       
    } catch (err) {
     response.status(500).send(err);
    }
  });
  




module.exports = router;