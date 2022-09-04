import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkRoleExist = async (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: "Role not found",
        });
      }
    }
  }
  next();
};

export const checkDuplicateUserNameOrEmail = async (req, res, next) => {
  const { userName, email } = req.body;
  const user = await User.findOne({ userName: userName });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const gmail = await User.findOne({ email: email });

  if (gmail) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  next();
};
