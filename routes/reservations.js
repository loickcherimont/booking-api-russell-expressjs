import express from "express";
import service from "../services/reservations.js";
import checkJWT from "../middleware/private.js";

/** mergeParams: true allows access to req.params.catwayNumber from the parent router */
const router = express.Router({ mergeParams: true });

router.post("/", checkJWT, service.addReservation);

router.get("/", checkJWT, service.getAllReservations);

router.get("/:id", checkJWT, service.getReservationById);

router.put("/:id", checkJWT, service.updateReservationById);

router.delete("/:id", checkJWT, service.deleteReservationById);

export default router;
