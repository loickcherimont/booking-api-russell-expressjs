import express from "express";
import service from "../services/users.js";

const router = express.Router();

router.post("/", service.authenticate);

export default router;