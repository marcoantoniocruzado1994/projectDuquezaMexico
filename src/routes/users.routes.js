import { Router } from "express";
import * as UsersController from "../controllers/user.controller";
import { AuthJwt, VerifiedSignup } from "../middlewares";
const router = Router();

router.post(
  "/",
  [ AuthJwt.verifyToken, 
    AuthJwt.isAdmin, 
    VerifiedSignup.checkRoleExist
],
  UsersController.createUser
);

export default router;
