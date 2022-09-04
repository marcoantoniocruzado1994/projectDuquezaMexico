import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {
  const { userName, password, email, roles } = req.body;

  const newUser = new User({
    userName,
    password: await User.encryptPassword(password),
    email,
  });

  if (roles) {
    const FoundRole = await Role.find({ name: { $in: roles } });
    newUser.roles = FoundRole.map((role) => role._id);
  } else {
    //buscamos el rol del usuario y se lo asignamos
    const role = await Role.findOne({ name: "user" }); //le asignamos el rol por defecto
    newUser.roles = [role._id];
  }

  const saveUser = await newUser.save();

  const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });

  res.status(200).json({
    message: "Signup",
    token
  });
};

export const signIn = async (req, res) => {
  const { userName, password, email } = req.body;
  const userFound = await User.findOne({ email: email }).populate("roles");

  if (!userFound) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isMatch = await User.comparePassword(password, userFound.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Password incorrect",
      token: null
    });
  }

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400, // expires in 24 hours
    })

  res.status(200).json({
    message: "Signin",
    token
  });
};
