import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,
    }]

});

UserSchema.statics.encryptPassword = async (password) => {

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;

}

UserSchema.statics.comparePassword = async (password,receivedPassword) => {

  const isMatch = await bcrypt.compare(password, receivedPassword);
  return isMatch;

}

export default model("User", UserSchema);