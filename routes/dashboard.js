import express from "express";
import getDashboardpage from "../services/dashboard.js";
import checkJWT from "../middleware/private.js";

const router = express.Router();

/**
 * @openapi
 * /dashboard:
 *   get:
 *     summary: Tableau de bord (protégé)
 *     tags: [Authentification]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Page tableau de bord
 *       401:
 *         description: Token requis ou invalide
 */
router.get("/", checkJWT, getDashboardpage);

export default router;
