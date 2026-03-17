import express from "express";
import {sendMessage, getAllMessages} from "../controller/messageController.js";

const router = express.Router();

router.post("/send",sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);
import { isAdminAuthenticated } from "../middlewares/auth.js";
export default router;
