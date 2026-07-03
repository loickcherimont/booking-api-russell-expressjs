import express from "express";
import service from "../services/users.js";

const router = express.Router();

router.post("/", service.authenticate);
router.get("/", service.logout);

export default router;