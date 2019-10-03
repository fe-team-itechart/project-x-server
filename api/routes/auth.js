const express = require('express');
const router = express.Router();
const passport = require('passport');

const { authController } = require('../controllers');
const { refreshToken } = require('../middlewares/index');
const jwtGuard = require('../middlewares/jwtGuard');

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     name: Login
 *     summary: Logs in a user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *           example:
 *            {
 *              "email":"slavasgod@gmail.com",
 *              "password":"123123123"
 *             }
 *         required:
 *           - username
 *           - password
 *     responses:
 *        '200':
 *         description: Return token
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *             example: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ1bml2ZXJzZXp4Y3ZAZ21haWwuY29tIiwiaWF0IjoxNTY4MDIzMjAyLCJleHAiOjE1NjgwMjMyMzh9._apV-RyrCHS0miAE0S9pt-06t6x3Xty-skuIWuLGp_k"}
 */

router.post('/login', authController.login);

/**
 * @swagger
 * /api/users/registration:
 *   post:
 *     name: Registration
 *     summary: Register  a user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               email:
 *                 type: string
 *           example:
 *                {
 *                   "email":"universezxcv@gmail.com",
 *                   "password":"123123123",
 *                   "confirmPassword":"123123123",
 *                   "firstName":"Artem",
 *                   "lastName":"Kashin",
 *                }
 *         required:
 *           - username
 *           - password
 *     responses:
 *        '200':
 *         description: Return token
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *             example: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ1bml2ZXJzZXp4Y3ZAZ21haWwuY29tIiwiaWF0IjoxNTY4MDIzMjAyLCJleHAiOjE1NjgwMjMyMzh9._apV-RyrCHS0miAE0S9pt-06t6x3Xty-skuIWuLGp_k"}
 */
router.post('/registration', authController.registration);

/**
 * @swagger
 * /api/users/auth/google:
 *   get:
 *     name: Google request
 *     summary: Google request
 *     responses:
 *        '200':
 *         description: Redirect to callback route
 */

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /api/auth/users/google/callback:
 *   get:
 *     name: Callback from google after login
 *     summary: Google request
 *     responses:
 *        '200':
 *         description: Return token
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *             example: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ1bml2ZXJzZXp4Y3ZAZ21haWwuY29tIiwiaWF0IjoxNTY4MDIzMjAyLCJleHAiOjE1NjgwMjMyMzh9._apV-RyrCHS0miAE0S9pt-06t6x3Xty-skuIWuLGp_k"}
 */

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  authController.socialLogin
);

/**
 * @swagger
 * /api/users/auth/linkedin:
 *   get:
 *     name: Callback from linkein after login
 *     summary: Linkedin request
 *     responses:
 *       '200':
 *        description: Redirect to callback function
 */

router.get('/auth/linkedin', passport.authenticate('linkedin'));

/**
 * @swagger
 * /api/users/auth/linkedin/callback:
 *   get:
 *     name: Callback from linkein after login
 *     summary: Linkedin request
 *     responses:
 *        '200':
 *         description: Return token
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *             example: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ1bml2ZXJzZXp4Y3ZAZ21haWwuY29tIiwiaWF0IjoxNTY4MDIzMjAyLCJleHAiOjE1NjgwMjMyMzh9._apV-RyrCHS0miAE0S9pt-06t6x3Xty-skuIWuLGp_k"}
 */

router.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/', session: false }),
  authController.socialLogin
);

/**
 * @swagger
 * /api/users/change-password/{userId}:
 *   put:
 *     name: Change password
 *     summary: Change user password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *           example:
 *            {
 *              "password":"123123123"
 *             }
 *         required:
 *           - password
 *     responses:
 *        '200':
 *         description: Success
 */
router.post('/reset', authController.reset);

router.post('/reset/:linkId', authController.resetApprovementPassword);

router.post('/reset-password', authController.resetPassword);

router.put(
  '/change-password',
  jwtGuard,
  refreshToken,
  authController.changePassword
);

module.exports = router;
