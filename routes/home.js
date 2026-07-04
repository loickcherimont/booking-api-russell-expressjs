import express from "express";
import getHomepage from "../services/home.js";

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Page d'accueil (connexion)
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: Page de connexion
 */
router.get("/", getHomepage);

export default router;
