const express = require("express"); //Required dependecy to work
const mysql = require("mysql"); //Required dependency for database functionality
const cors = require("cors"); //cors is required to connect to database

const bodyParser = require("body-parser"); //reads post data and parses to json
const cookieParser = require("cookie-parser"); // parses cookie headers and handles cookie separation and encoding
const session = require("express-session"); //creates and maintains sessions

const bcrypt = require("bcrypt"); //requires bcrypt dependency
const saltRounds = 10; //ensures more complex and secure hashes are used

const jwt = require("jsonwebtoken"); //Required web token dependancy
const { response } = require("express");
const jwtSecret = "BtpUaRv84rRK6YW5Aluz";

const app = express();

app.use(express.json()); //app parses everything to json
app.use(
  cors({
    //tells app to use cors
    origin: ["http://localhost:3000"], //allowed domains for sessions
    methods: ["GET", "POST", "UPDATE", "PUT", "DELETE"], //Allowed methods
    credentials: true,
  })
);
app.use(cookieParser()); //tells app to use cookie parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    //creating sessions
    key: "userID", //name of session
    secret:
      "gclowejsgukoaamqltxgeihcshqrclikhtkmkkhnkuegazyuhjrfqcpjgufhhguatbzvjkrsdnilmoodcjripdmhqfpisdekbzqqtoiuirytnozmtbznhfytujlycbej",
    //random unguessable string
    resave: false, //ensures new sessions
    saveUninitialized: false, //prevents sessions from being stored
    cookie: {
      expires: 60 * 60 * 24 * 1000 * 2,
    },
  })
);

//Database set up
const db = mysql.createConnection({
  //Creates database connection
  user: "root",
  host: "localhost",
  password: "",
  database: "student_planner_app",
});

app.post("/register", (req, res) => {
  //catch variables from front end
  const username = req.body.username;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    //encrypt the variable password using bcrypt
    if (err) {
      console.log(err);
    }
    //insert into database users, these rows, these values.
    db.query(
      "INSERT INTO users (username, email, name, password) VALUES (?,?,?,?)",
      [username, email, fullname, hash],
      (err, result) => {
        //console log errors if any
        console.log(err);
      }
    );
  });
});

app.post("/createList", (req, res) => {
  //catch variables from front end
  const list = req.body.list;
  const id = req.body.id;
  const currentUser = req.body.currentUser;

  //insert into database users, these rows, these values.
  db.query(
    "INSERT INTO lists (id, list, username) VALUES (?,?,?)",
    [id, list, currentUser],
    (err, result) => {
      //console log errors if any
      console.log(err);
    }
  );
});

app.put("/updateList", (req, res) => {
  const list = req.body.list;
  const id = req.body.id;
  db.query(
    `UPDATE lists SET list = '${list}' WHERE list_id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteList/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM lists WHERE list_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createTask", (req, res) => {
  //catch variables from front end
  const id = req.body.id;
  const task = req.body.Task;
  const status = req.body.status;

  //insert into database users, these rows, these values.
  db.query(
    `INSERT INTO tasks (list_id, task, status) VALUES (?,?,?)`,
    [id, task, status],
    (err, response) => {
      //console log errors if any
      console.log(err);
      res.send(response);
    }
  );
});

app.post("/getTasks/", (req, res) => {
  const id = req.body.id;
  const sqlGET = `SELECT * FROM tasks WHERE list_id = '${id}' AND status = "false"`;
  db.query(sqlGET, (err, result) => {
    //console log errors if any
    if (err) {
      res.json({ message: "ERROR" });
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/completeTask", (req, res) => {
  const id = req.body.id;
  const complete = req.body.complete;
  db.query(`UPDATE tasks SET status = '${complete}' WHERE task_id = ${id}`);
});

app.post("/getCompletedTasks", (req, res) => {
  const status = req.body.status;
  db.query(`SELECT task FROM tasks WHERE status = "true"`, (err, result) => {
    if (err) {
      res.json({ message: "ERROR" });
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/login", (req, res) => {
  //catch route from frontend
  if (req.session.user) {
    //if there is a user session already (logged in cookie)
    res.send({ loggedIn: true, user: req.session.user }); //send the user details back
  } else {
    //if there isnt an object called req.session.user
    res.send({ loggedIn: false }); // set logged in variable to false
  }
});

//if no token present send error message
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("No token present");
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "User is not authenticated" });
        //if no errors and token is present save the decoded id as variable userID
      } else {
        req.userID = decoded.id;
        next();
      }
    });
  }
};

//catch route from front end
//check if user has the correct token
//apply middlewear to every sensitive request
app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("User authenticated"); //if correct send message
});

app.get("/getUser", verifyJWT, (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT id FROM users WHERE username = ?",
    username,
    (err, result) => {
      //console log errors if any
      if (err) {
        res.json({ message: "ERROR" });
      } else {
        res.send.response;
      }
    }
  );
});

app.post("/login", (req, res) => {
  //catch variables from front end
  const username = req.body.username;
  const password = req.body.password;

  //select all from table users, where username and password are the same as current values.
  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        //if errors send errors
        res.send({ err: err });
      }
      if (result.length > 0) {
        // if result is found compare password to user input
        bcrypt.compare(password, result[0].password, (error, response) => {
          //if response is correct send result
          if (response) {
            //also return the id from the database
            const id = result[0].id;
            const token = jwt.sign({ id }, jwtSecret, {
              expiresIn: 300, //token expires in 5 mins
            });
            req.session.user = result;
            //if user is authorised pass all info to the frontend
            res.json({ auth: true, token: token, result: result });
          } else {
            res.json({ auth: false, message: "Wrong username or password" });
          }
        });
      } else {
        res.json({ auth: false, message: "no user exists" });
      }
    }
  );
});

app.post("/getLists/", (req, res) => {
  const currentUser = req.body.currentUser;
  const sqlGET = `SELECT * FROM lists WHERE username = '${currentUser}'`;
  db.query(sqlGET, (err, result) => {
    //console log errors if any
    if (err) {
      res.json({ message: "ERROR" });
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  if (err) {
    //if errors send errors
    res.send(err);
  } else {
    res.json({ message: "User Logged Out" });
  }
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
