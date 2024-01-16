import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 12)
          throw new Error("Invalid password, must be at least 2 characters");
      },
    },
  },
  { collection: "users_list" }
);

export default mongoose.model("User", UserSchema);
