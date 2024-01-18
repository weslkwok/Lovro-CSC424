import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./user.js";

// mongoose.set("debug", true);

// connect to database
dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.once("connected", () => {
  console.log("Database connected successfuly");
});

async function checkUser(userid, password) {
  try {
    return await UserModel.find({ userid: userid, password: password });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getUserByName(userid) {
  try {
    return await UserModel.find({ userid: userid });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

function validatePassword(password) {
  const isLongEnough = password.length >= 12;
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);

  return isLongEnough && hasNumber && hasSymbol && hasUpper && hasLower;
}

async function addUser(user) {
  try {
    const userToAdd = new UserModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { checkUser, getUserByName, validatePassword, addUser };
