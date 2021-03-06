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

app.get("/", (req, res) => {
  res.send("Hello World");
});

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
      (err, response) => {
        if (err) {
          res.json({ userExist: false, message: "Username taken" });
        } else {
          res.json({ userExist: true });
        }
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
    (err, response) => {
      //console log errors if any
      res.send(response);
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
  const sqlGET = `SELECT * FROM tasks WHERE list_id = ${id} AND status = "false"`;
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
  db.query(
    `UPDATE tasks SET status = '${complete}' WHERE task_id = ${id}`,
    (err, response) => {
      console.log(err);
      res.send(response);
    }
  );
});

app.put("/undoComplete", (req, res) => {
  const id = req.body.id;
  const complete = req.body.complete;
  db.query(
    `UPDATE tasks SET status = '${complete}' WHERE task_id = ${id}`,
    (err, response) => {
      console.log(err);
      res.send(response);
    }
  );
});

app.post("/getCompletedTasks", (req, res) => {
  const status = req.body.status;
  db.query(`SELECT * FROM tasks WHERE status = "true"`, (err, result) => {
    if (err) {
      res.json({ message: "ERROR" });
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteTask/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tasks WHERE task_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/getPlans", (req, res) => {
  const user = req.body.user;
  db.query(`SELECT * FROM plans WHERE username = '${user}'`, (err, result) => {
    if (err) {
      res.json({ message: "ERROR" });
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createPlan", (req, res) => {
  const id = req.body.id;
  const user = req.body.user;
  const plan = req.body.plan;
  const due = req.body.due;
  db.query(
    `INSERT INTO plans (id, username, plan, due) VALUES (?,?,?,?)`,
    [id, user, plan, due],
    (response) => {
      res.send(response);
    }
  );
});

app.put("/updatePlan", (req, res) => {
  const plan = req.body.plan;
  const id = req.body.id;
  const due = req.body.due;
  db.query(
    `UPDATE plans SET plan = '${plan}', due = '${due}' WHERE planid = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deletePlan/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM plans WHERE planid = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/getPla", (req, res) => {
  const planid = req.body.id;
  db.query(`SELECT * FROM plan WHERE planid = '${planid}'`, (err, result) => {
    if (err) {
      res.json({ message: "ERROR" });
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createPla", (req, res) => {
  const planid = req.body.planid;
  const title = req.body.title;
  const startdate = req.body.startdate;
  const duedate = req.body.duedate;
  const priority = req.body.priority;
  db.query(
    `INSERT INTO plan (planid, title, startdate, duedate, priority) VALUES (?,?,?,?,?)`,
    [planid, title, startdate, duedate, priority],
    (response) => {
      res.send(response);
    }
  );
});

app.put("/updatePlanName", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  db.query(
    `UPDATE plan SET title =? WHERE titleid = '${id}'`,
    [title, id],
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
        res.send(response);
      }
    }
  );
});

app.put("/updatePla", (req, res) => {
  const id = req.body.id;
  const start = req.body.startdate;
  const due = req.body.duedate;
  const priority = req.body.priority;
  db.query(
    `UPDATE plan SET startdate =?, duedate = ?, priority = ? WHERE titleid = '${id}'`,
    [start, due, priority],
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
        res.send(response);
      }
    }
  );
});

app.delete("/deletePla/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM plan WHERE titleid = ?", id, (err, result) => {
    if (err) {
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
  res.json({ message: "User Logged Out" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server running on port 3001");
});
