import express from "express";
import service from "../services/catways.js";
import checkJWT from "../middleware/private.js";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Catway:
 *       type: object
 *       required:
 *         - catwayType
 *       properties:
 *         catwayNumber:
 *           type: integer
 *           description: Numéro unique du catway (auto-généré)
 *         catwayType:
 *           type: string
 *           enum: [long, short]
 *           description: Type de catway
 *         catwayState:
 *           type: string
 *           description: État du catway
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 */

/**
 * @openapi
 * /catways:
 *   post:
 *     summary: Ajouter un catway
 *     tags: [Catways]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayType
 *             properties:
 *               catwayType:
 *                 type: string
 *                 enum: [long, short]
 *               catwayState:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirection vers /catways
 *       400:
 *         description: Erreur de validation
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Page de gestion des catways
 */
router.post("/", checkJWT, service.addCatway);
router.get("/", checkJWT, service.getAllCatways);

/**
 * @openapi
 * /catways/{catwayNumber}:
 *   get:
 *     summary: Détail d'un catway
 *     tags: [Catways]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Page détail du catway
 *       404:
 *         description: Catway non trouvé
 *   put:
 *     summary: Modifier l'état d'un catway
 *     tags: [Catways]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway modifié
 *       404:
 *         description: Catway non trouvé
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       302:
 *         description: Redirection vers /catways
 *       404:
 *         description: Catway non trouvé
 */
router.get("/:catwayNumber", checkJWT, service.getCatwayByCatwayNumber);
router.post("/:catwayNumber/update", checkJWT, service.updateCatwayStateByCatwayNumber);
router.put("/:catwayNumber", checkJWT, service.updateCatwayStateByCatwayNumber);
router.delete("/:catwayNumber", checkJWT, service.deleteCatwayByCatwayNumber);

export default router;
