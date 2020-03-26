<!-- prettier-ignore-start -->
0. {SQL}  
{DB:utf8_gen_ci} [Linux bug: prevent by making all fields lowercase] :
 a. utf8 general bin
 b. id _ primary ai / re
 c. review id as index id index  / restId as primary + null as default + null checkbox [take notice, second primary not AI not Null] מצאתי את הפתרון- עקום אבל עובד, לא לתת אינדקס על הטבלה השנייה ורק אחרי היצירה לשים- מקווה שזה יעבוד כמו שצריך
 d. attach id on designer 5.add data manually  

1.  {SERVER}
a. mkdir server + cd server
b. app.js
c. npm init -y
d. npm i express mysql cors axios express-session
e. dep. folder logic:<br>
  a. dal (data access layer) express db access b. business logic- product-logic ( get all, get one, CRUD) c. controllers - product-controller ( get. post, routing) d. app. js - (express, connection, server use)

6. DAL - make sql connection with promise and export:<br>
  const mysql = require("mysql"); const connection = mysql.createConnection({ host: "localhost", user: "root", password: "q1w2e3", database: "restotasks" }); connection.connect(err => { if (err) {
  console.error(err);
   return;
   } console.log("We're connected to restotasks on MySQL."); }); function executeAsync(sql) { return new Promise((resolve, reject) => {
  connection.query(sql, (err, result) => {
       if (err) {
           reject(err);
           return;
       }
       resolve(result);
   });
   }); } module.exports = { executeAsync };
7. BLL - "export" the sql query as in crud:<br>
  const dal = require("../data-access-layer/dal"); async function getAllRestsAsync() { const sql = "SELECT * FROM `restaurants`"; const restos = await dal.executeAsync(sql); return restos; } module.exports = { getAllRestsAsync }
8. CTRL - use the router so that the sql query will be submitted on a url:<br>
  const express = require("express"); const restsLogic = require("../business-logic-layer/rest-logic"); const router = express.Router(); // GET <http://localhost:3000/api/products> router.get("/restos", async (request, response) => { try {
  const rests = await restsLogic.getAllRestsAsync();
   response.json(rests);
   } catch (err) {
  response.status(500).send(err.message);
   } }); module.exports = router;
9. app.js connect the cors + listen to the server with express and the controller:<br>
  const express = require("express"); const cors = require("cors"); const restController = require("./controllers/resto-controller"); const server = express(); server.use(cors()); server.use(express.json()); server.use("/api", restController); server.listen(3100, () => console.log("Listening on <http://localhost:3100>"));
10. make sure all folders and applications are spelled correctly
11. test the first api call with postman- plan ahead- are there additional routes?
12. DB extended notes:<br>
  [if there's a secondary primary id on the 2nd table - it won't accept null- allways send an added value] join tables simplified: SELECT * FROM `reviews` JOIN restaurants ON `restId`= id join tables extended: SELECT S.id, S.employeeID, S.date, S.salary, E.firstName, E.lastName
  FROM Salaries as S JOIN Employees as E
  ON E.id = S.employeeID
  `restCode``restId``date``visitor``review`
  select r.restCode, r.restId, r.date, r.visitor, r.review, s.restname
  from reviews as r join restaurants as s
  on r.id = s.id
13. add an item with ID:<br>
  async function addSalaryAsync(salary) { const sql = `INSERT INTO Salaries(employeeID, Date, Salary)
  VALUES(${salary.employeeID},'${salary.date}',${salary.salary})`;
  const info = await dal.executeAsync(sql); salary.id = info.insertId; return salary; }
14. final output: insert...<br>
  async function addReviewAsync(review) { const sql = `INSERT INTO reviews(restCode,date, visitor, review)
  VALUES(${review.restCode},'${review.date}',${review.visitor},${review.review})`;
  const info = await dal.executeAsync(sql); review.id = info.insertId; return review; }
15. MAKE sure strings are marked with single quote- or it won't post:<br>
  async function addReviewAsync(review) { const sql = `INSERT INTO reviews(restCode,date, visitor, review) VALUES(${review.restCode},'${review.date}','${review.visitor}','${review.review}')`; const info = await dal.executeAsync(sql); review.id = info.insertId; return review; }
16. id extra fiber: [controller] router.get("/albums/:id/photos", async (request, response) => { try {
  const id = +request.params.id;
  const photos = await factoryLogic.getAllPhotosAsync(id);
  response.json(photos);
  } catch (err) {
  response.status(500).send(err.message);
  } });
17. xtra logic(id):<br>
  async function getEmployeeSalariesAsync(id) { const sql = `SELECT S.id, S.employeeID, S.date, S.salary, E.firstName, E.lastName
  FROM Salaries as S JOIN Employees as E
  ON E.id = S.employeeID
  WHERE S.employeeID = ${id}`;
  const salaries = await dal.executeAsync(sql); return salaries; }
18. insert into (id):<br>
  async function addSalaryAsync(salary) { const sql = `INSERT INTO Salaries(employeeID, Date, Salary)
  VALUES(${salary.employeeID},'${salary.date}',${salary.salary})`;
  const info = await dal.executeAsync(sql); salary.id = info.insertId; return salary; } async function addReviewAsync(rev) { const sql = `INSERT INTO reviews (restId, visitor,date, review) VALUES (${rev.restId}, '${rev.visitor}', '${rev.date}', '${rev.review}')`; const restos = await dal.executeAsync(sql); return restos; }
19. CTRL:<br>
  router.post("/reviews", async (request, response) => { try { const review = request.body; const addedReview = await restsLogic.addReviewAsync(review); response.status(201).json(addedReview); } catch (err) { response.status(500).send(err.message); } });  
20. add important parts:
DATE_FORMAT(gameDate, "%m/%d/%Y %H:%i") as
21.  npm i express-session
