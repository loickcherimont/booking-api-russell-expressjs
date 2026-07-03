import express from "express";
import service from "../services/users.js";

const loginRoute = express.Router();
const logoutRoute = express.Router();

loginRoute.post("/", service.authenticate);
logoutRoute.get("/", service.logout);

export { loginRoute, logoutRoute };