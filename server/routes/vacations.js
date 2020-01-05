var express = require("express");
var router = express.Router();
const app = express();
var mysql = require("mysql");
var moment = require("moment");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vacations"
});
connection.connect();

function checkVacationExist(vaca) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT *
        FROM vaca
        WHERE name = "${vaca}";`,
      function(error, results, fields) {
        if (results.length === 0) {
          resolve("Approved");
        } else {
          reject("Vacation Already exist.");
        }
      }
    );
  });
}

router.post("/addvacation", async (req, res) => {
  try {
    await checkVacationExist(req.body.vacationName);
    connection.query(
      `INSERT INTO vaca (name, description, destination, img_link, depart, return_time, price, followers)
    VALUES ("${req.body.vacationName}", "${req.body.description}", "${
        req.body.destination
      }","${req.body.imgLink}", "${moment(req.body.from).format(
        "LLLL"
      )}", "${moment(req.body.to).format("LLLL")}", ${req.body.price}, 0);`,
      function(error, results, fields) {
        if (error) throw error;
      }
    );

    console.log("Succes");
    res.status(200).send("Vacation Added");
  } catch (error) {
    res.send(error);
  }
});

router.post("/getfollowedvacations", (req, res) => {
  console.log(req.body.userName);
  connection.query(
    `SELECT * FROM follows WHERE username = "${req.body.userName}"`,
    function(error, results, fields) {
      var followedList = [];

      results.map(v => {
        followedList.push(v.vacation);
      });
      connection.query("SELECT * FROM vaca", function(err, result, field) {
        var unFollowedList = [];
        var followedListToSend = [];
        for (let i = 0; i < result.length; i++) {
          if (followedList.includes(result[i].name)) {
            result[i].isFollowed = true;
            followedListToSend.push(result[i]);
          } else {
            result[i].isFollowed = false;
            unFollowedList.push(result[i]);
          }
        }
        let obj = { unFollowedList, followedListToSend };
        res.send(obj);
      });
    }
  );

  // connection.query("SELECT * FROM vaca", function(error, results, fields) {
  //   if (error) throw error;

  //   console.log(results[0]);
  //   res.send(results);
  // });
});

router.post("/getspecificvacationdata", (req, res) => {
  let q = `SELECT * FROM vacations.vaca WHERE name = "${req.body.name}";`;
  connection.query(q, function(error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

router.delete("/deletevacation", (req, res) => {
  let q = `DELETE FROM vaca WHERE name="${req.body.name}";`;
  connection.query(q, function(error, results, fields) {
    if (error) throw error;
    res.status(200).send(`${req.body.name} was deleted`);
  });
});

router.put("/editvacation", (req, res) => {
  let q = `UPDATE vaca
  SET name = '${req.body.editName}', description= '${req.body.editDescription}', destination = "${req.body.editDestination}", img_link ="${req.body.editImgLink}" , depart="${req.body.editFrom}", return_time="${req.body.editTo}",price = ${req.body.editPrice} 
  WHERE name = '${req.body.prevName}';`;
  connection.query(q, function(error, results, fields) {
    if (error) throw error;
    res.status(200).send(`${req.body.prevName} was edited and saved.`);
  });
});

function getFollowFromUser(user, vacation) {
  return new Promise((reso, reject) => {
    let q = ` SELECT * FROM follows WHERE username="${user}" AND vacation='${vacation}'`;
    connection.query(q, function(error, results, fields) {
      if (results.length === 0) {
        reso(true);
      } else {
        reject("Already following");
      }
    });
  });
}
router.put("/newfollower", async (req, res) => {
  try {
    let follows = await getFollowFromUser(req.body.user, req.body.vacation);

    connection.query(
      `UPDATE vaca
  SET followers = followers + 1
  WHERE name = '${req.body.vacation}'`,
      function(error, results, fields) {}
    );

    let q = `INSERT INTO follows (username, vacation)
    VALUES ('${req.body.user}', '${req.body.vacation}');
    `;
    connection.query(q, function(error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res
          .status(200)
          .send(`${req.body.user} follows after ${req.body.vacation}`);
      }
    });
  } catch (error) {
    res.status(201).send(`Already Follows ${req.body.vacation}`);
  }
});

router.put("/unfollow", (req, res) => {
  connection.query(
    `UPDATE vaca
  SET followers = followers - 1
  WHERE name = '${req.body.vacation}'`,
    function(error, results, fields) {}
  );

  let q = `DELETE FROM follows WHERE username='${req.body.user}' and vacation = '${req.body.vacation}';`;

  connection.query(q, function(error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(`${req.body.user} unfollowed ${req.body.vacation}`);
    }
  });
});

router.get("/getvacations", (req, res) => {
  let q = `SELECT name FROM vaca `;
  connection.query(q, function(error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      let list = [];
      results.map(n => list.push(n.name));
      res.send(list);
    }
  });
});

module.exports = router;
