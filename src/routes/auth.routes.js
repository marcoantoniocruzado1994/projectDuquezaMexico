import { Router } from "express";
const router = Router()
import * as authController from '../controllers/auth.controller';
import { VerifiedSignup } from "../middlewares";

//Signup
router.post('/signup', [VerifiedSignup.checkDuplicateUserNameOrEmail,VerifiedSignup.checkRoleExist],authController.signUp);


//Signin
router.post('/signin', authController.signIn);


export default router;