import express from "express";
import { User } from "../models/user.js";
import mongoose from "mongoose";
import { Register, getMyProfile, login, logout} from "../controllers/user.js";
import {isAuthenticated} from "../midddlewares/auth.js"

const router=  express.Router();

router.post("/users/new", Register)
router.post("/users/login",login)
router.get("/users/logout",logout)

router.get("/users/me",isAuthenticated,getMyProfile);

export default router;