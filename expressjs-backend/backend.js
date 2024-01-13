const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;

app.use(express.json());
app.use(cors());

const users = {
  users_list: [{ userid: "bj", password: "pass424" }],
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// check a user and password and return token
app.post("/account/login", (req, res) => {
  const userToCheck = req.body;
  const user = users["users_list"].find(
    (user) =>
      user["userid"] === userToCheck.userid &&
      user["password"] === userToCheck.password
  );

  if (user) {
    res.status(200).send("User successfully authenticated");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

function validatePassword(password) {
  const isLongEnough = password.length >= 12;
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);

  return isLongEnough && hasNumber && hasSymbol && hasUpper && hasLower;
}

// create a new user
app.post("/account/registration", (req, res) => {
  const userToAdd = req.body;
  const matchingUser = users["users_list"].find(
    (user) => user["userid"] === userToAdd.userid
  );

  if (validatePassword(userToAdd.password)) {
    if (!matchingUser) {
      users["users_list"].push(userToAdd);
      res.status(201).send(userToAdd).end();
    } else {
      res.status(409).send("Conflicting username");
    }
  } else {
    res.status(400).send("Insufficient password strength");
  }
});

// get all users
app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
