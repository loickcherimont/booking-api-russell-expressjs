import express from "express";
import userRoute from "./users.js";
import catwayRoute from "./catways.js";
import reservationRoute from "./reservations.js";
import loginRoute from "./auth.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/catways", catwayRoute);
router.use("/catways/:catwayNumber/reservations", reservationRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);

export default router;
