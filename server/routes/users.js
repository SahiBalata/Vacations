var express = require("express");
var router = express.Router();
const app = express();
var mysql = require("mysql");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require("jsonwebtoken");

//SQL connectiion
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vacations"
});
connection.connect();

//Registration handlers
function checkUserExist(user) {
    return new Promise((reso, rej) => {
        connection.query(
            `SELECT username 
    FROM users WHERE username = "${user}" `,
            function(error, results, fields) {
                if (results.length == 0) {
                    reso(true);
                } else if (error) {
                    rej(error);
                } else {
                    rej("User already exist");
                }
            }
        );
    });
}

function checkEmailExist(email) {
    return new Promise((reso, rej) => {
        connection.query(
            `SELECT email 
        FROM users WHERE email = "${email}" `,
            function(error, results, fields) {
                if (results.length == 0) {
                    console.log(results);
                    reso(true);
                } else if (error) {
                    rej(error);
                } else {
                    rej("Email already exist");
                }
            }
        );
    });
}

router.post("/register", async(req, res) => {
    try {
        await checkUserExist(req.body.userName);
        await checkEmailExist(req.body.email);
        var hash = bcrypt.hashSync(req.body.password, salt);
        let array = JSON.stringify([]);
        let q = `INSERT INTO users (username, password, email, lastName, firstName, admin, vaca_followed)
    VALUES ("${req.body.userName}", "${hash}", "${req.body.email}","${
      req.body.lastName
    }", "${req.body.firstName}", ${false}, '${array}');`;
        connection.query(q, function(error, results, fields) {
            if (error) throw error;
            res.status(200).send(`${req.body.userName} was created`);
        });
    } catch (err) {
        res.status(201).send(err);
    }
});

//Login handelers
function checkUser(user, password) {
    return new Promise((reso, rej) => {
        let q = `SELECT password, admin
        FROM users WHERE username = "${user}"`;
        connection.query(q, function(error, results, fields) {
            if (error) throw error;
            console.log(results);
            if (results.length === 0) {
                rej("User is not exist");
            } else if (!bcrypt.compareSync(password, results[0].password)) {
                rej("Password is incorrect");
            } else if (results[0].admin === 1) {
                console.log("Admin connected");
                reso(true);
            } else {
                reso(false);
            }
        });
    });
}

router.post("/login", async(req, res) => {
    try {
        let CU = await checkUser(req.body.userName, req.body.password);
        const user = { name: req.body.userName, admin: CU };
        const accessToken = jwt.sign(user, "tomer");
        var decoded = jwt.verify(accessToken, "tomer");

        let outPutObj = { accessToken: accessToken, decoded: decoded };
        res.status(200).send(outPutObj);
    } catch (err) {
        res.status(201).send(err);
    }
});

router.post("/token", (req, res) => {
    var decoded = jwt.verify(req.body.token, "tomer");
    res.send(decoded);
});

module.exports = router;