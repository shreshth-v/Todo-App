import express from "express";
import {
  loginUser,
  signupUser,
  logoutUser,
  checkAuth,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { signupSchema, loginSchema } from "../validations/auth.validation.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signupUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/check", verifyToken, checkAuth);

export default router;
