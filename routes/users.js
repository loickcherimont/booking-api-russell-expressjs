import express from "express";
import service from "../services/users.js";
import checkJWT from "../middleware/private.js";

const router = express.Router();

router.post("/", checkJWT, service.addUser);

router.get("/", checkJWT, service.getAllUsers);

router.get("/:email", checkJWT, service.getByUserEmail);

router.put("/:email", checkJWT, service.updateUserByEmail);

router.delete("/:email", checkJWT, service.deleteUserByEmail);


export default router;
