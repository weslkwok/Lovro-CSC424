import mongoose from "mongoose";
import userModel from "./user.js";

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsers(userid, password) {
  let result;
  if (userid === undefined && password === undefined) {
    result = await userModel.find();
  } else if (userid && !password) {
    result = await findUserByName(userid);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(userid) {
  return await userModel.find({ userid: userid });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};
