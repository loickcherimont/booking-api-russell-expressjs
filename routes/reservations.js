import express from "express";
import service from "../services/reservations.js";
import checkJWT from "../middleware/private.js";

/** mergeParams: true allows access to req.params.catwayNumber from the parent router */
const router = express.Router({ mergeParams: true });

/**
 * @openapi
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - clientName
 *         - boatName
 *         - startDate
 *         - endDate
 *       properties:
 *         catwayNumber:
 *           type: integer
 *           description: Numéro du catway réservé
 *         clientName:
 *           type: string
 *           description: Nom du client
 *         boatName:
 *           type: string
 *           description: Nom du bateau
 *         startDate:
 *           type: string
 *           format: date
 *           description: Date de début de réservation
 *         endDate:
 *           type: string
 *           format: date
 *           description: Date de fin de réservation (après startDate)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /catways/{catwayNumber}/reservations:
 *   post:
 *     summary: Ajouter une réservation
 *     tags: [Réservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - boatName
 *               - startDate
 *               - endDate
 *             properties:
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       302:
 *         description: Redirection vers la liste des réservations
 *       400:
 *         description: Erreur de validation
 *   get:
 *     summary: Liste les réservations d'un catway
 *     tags: [Réservations]
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
 *         description: Page de gestion des réservations
 */
router.post("/", checkJWT, service.addReservation);
router.get("/", checkJWT, service.getAllReservations);

/**
 * @openapi
 * /catways/{catwayNumber}/reservations/{id}:
 *   get:
 *     summary: Détail d'une réservation
 *     tags: [Réservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page détail de la réservation
 *       404:
 *         description: Réservation non trouvée
 *   put:
 *     summary: Modifier une réservation
 *     tags: [Réservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Réservation modifiée
 *       404:
 *         description: Réservation non trouvée
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Réservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirection vers la liste des réservations
 */
router.get("/:id", checkJWT, service.getReservationById);
router.post("/:id/update", checkJWT, service.updateReservationById);
router.put("/:id", checkJWT, service.updateReservationById);
router.delete("/:id", checkJWT, service.deleteReservationById);

export default router;
