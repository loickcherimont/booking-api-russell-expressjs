import express from "express";
import service from "../services/users.js";

const loginRoute = express.Router();
const logoutRoute = express.Router();

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Authentification
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirection vers /dashboard
 *       401:
 *         description: Identifiants incorrects
 *       404:
 *         description: Utilisateur non trouvé
 */
loginRoute.post("/", service.authenticate);

/**
 * @openapi
 * /logout:
 *   get:
 *     summary: Déconnexion
 *     tags: [Authentification]
 *     responses:
 *       302:
 *         description: Redirection vers /
 */
logoutRoute.get("/", service.logout);

export { loginRoute, logoutRoute };
