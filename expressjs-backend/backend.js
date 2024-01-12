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
      user["useridid"] === userToCheck.id &&
      user["password"] === userToCheck.password
  );

  if (user) {
    res.status(200).send("User successfully authenticated");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
