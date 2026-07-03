import express from "express";
import getHomepage from "../services/home.js";

const router = express.Router();

router.get("/", getHomepage);

export default router;
