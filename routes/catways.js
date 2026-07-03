import express from "express";
import service from "../services/catways.js";
import checkJWT from "../middleware/private.js";

const router = express.Router();

router.post("/", checkJWT, service.addCatway);

router.get("/", checkJWT, service.getAllCatways);

router.get("/:catwayNumber", checkJWT, service.getCatwayByCatwayNumber);

router.put("/:catwayNumber", checkJWT, service.updateCatwayStateByCatwayNumber);

router.delete("/:catwayNumber", checkJWT, service.deleteCatwayByCatwayNumber);


export default router;
