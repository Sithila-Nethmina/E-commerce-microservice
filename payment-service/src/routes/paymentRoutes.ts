import { Router } from "express";
import {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - orderId
 *         - amount
 *         - method
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         orderId:
 *           type: string
 *           description: ID of the associated order
 *         amount:
 *           type: number
 *           description: Payment amount
 *         method:
 *           type: string
 *           enum: [credit_card, debit_card, paypal, bank_transfer, cash_on_delivery]
 *           description: Payment method
 *         status:
 *           type: string
 *           enum: [pending, completed, failed, refunded]
 *           description: Payment status
 *         transactionDate:
 *           type: string
 *           format: date-time
 *       example:
 *         orderId: "60d21b4667d0d8992e610c85"
 *         amount: 1999.98
 *         method: credit_card
 *         status: pending
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of all payments
 */
router.get("/", getAllPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 */
router.get("/:id", getPaymentById);

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Process a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment processed successfully
 *       400:
 *         description: Bad request
 */
router.post("/", createPayment);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update payment status
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 */
router.put("/:id", updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Void a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment voided successfully
 *       404:
 *         description: Payment not found
 */
router.delete("/:id", deletePayment);

export default router;
