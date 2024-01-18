import express from "express";
import cors from "cors";
import {
  checkUser,
  getUserByName,
  validatePassword,
  addUser,
} from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/******************************** User Routes *********************************/

app.post("/account/login", async (req, res) => {
  const userToCheck = req.body;
  const user = await checkUser(userToCheck.userid, userToCheck.password);

  if (user.length) {
    res.status(200).send("User successfully authenticated");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// create a new user
app.post("/account/registration", async (req, res) => {
  const userToAdd = req.body;
  const matchingUser = await getUserByName(userToAdd.userid);

  if (validatePassword(userToAdd.password)) {
    if (!matchingUser.length) {
      const user = await addUser({
        userid: userToAdd.userid,
        password: userToAdd.password,
      });
      console.log(user);
      res.status(201).send(user);
    } else {
      res.status(409).send("Conflicting username");
    }
  } else {
    res.status(400).send("Insufficient password strength");
  }
});

app.get("/users", (req, res) => {
  const userToCheck = req.body;
  const user = checkUser(userToCheck.userid, userToCheck.password);

  if (user) {
    res.status(200).send("User successfully authenticated");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
