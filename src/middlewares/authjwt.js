import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import  Role from "../models/Role";

// Middleware to check if the user is authenticated
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        token: null,
      });
    }

    const decode = jwt.verify(token, config.SECRET);
    req.userId = decode.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        token: null,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Auth failed",
      token: null,
    });
  }
};

// Middleware to check if the user is moderator 
export const isModerator = async (req, res, next) => {

    const user  = await User.findById(req.userId) ;
    const rolesUser = await Role.find({_id: {$in: user.roles}}) 
    
    console.log(rolesUser);

    for (let i = 0; i < rolesUser.length; i++) {
        if (rolesUser[i].name === "moderator" ) {
            next()
            return;
        }
    }

    return res.status(401).json({
        message: "requiere un  moderator role",
        token: null,
    });


}
// Middleware to check if the user is admin
export const isAdmin = async (req, res, next) => {

  const user  = await User.findById(req.userId) //lo vamos a obtener desde la funcion de verifyToken ya que crea una propiedad userId
  const rolesUser = await Role.find({_id: {$in: user.roles}})



  for (let i = 0; i < rolesUser.length; i++) {
      if (rolesUser[i].name === "admin" ) {
          next()
          return;
      }
  }

  return res.status(401).json({
      message: "requiere un  admin role",
      token: null,
  });
}

