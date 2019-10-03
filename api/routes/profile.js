const express = require('express');
const router = express.Router();
const { profileController } = require('../controllers');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Bearer:
 *        type: apiKey
 *        name: Authorization
 *        in: header
 * /api/profile/public:
 *    get:
 *     security:
 *       - Bearer: []
 *     name: Get Profile
 *     summary: Get user profile
 *     consumes:
 *       - application/json
 *     responses:
 *        '200':
 *         description: Success
 *        '400':
 *         description: User not found.
 */
router.get('/public', profileController.getProfile);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Bearer:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 * /api/profile/public:
 *   put:
 *     security:
 *       - Bearer: []
 *     name: Update Profile
 *     summary: Update user profle
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
 *               description:
 *                 type: string
 *               twitterLink:
 *                 type: string
 *               linkedInLink:
 *                 type: string
 *               facebookLink:
 *                 type: string
 *           example:
 *            {
 *              "firstName":"Artsiom",
 *              "lastName":"Kashyn",
 *              "description":"lorem ipsum",
 *              "twitterLink":"https://twitter.com/",
 *              "linkedInLink":"https://www.linkedin.com/",
 *              "facebookLink":"https://www.facebook.com/"
 *             }
 *         required:
 *           - firstName
 *           - lastName
 *     responses:
 *        '200':
 *         description: Success
 *        '400':
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 description:
 *                   type: string
 *                 twitterLink:
 *                   type: string
 *                 linkedInLink:
 *                   type: string
 *                 facebookLink:
 *                   type: string
 *             example:
 *               {
 *                 "firstName": "First name is not allowed to be empty",
 *                 "lastName": "Last name is not allowed to be empty",
 *                 "description": "Description length must be less than or equal to 255 characters long",
 *                 "twitterLink": "Twitter link must be a valid uri",
 *                 "facebookLink": "Facebook link must be a valid uri",
 *                 "linkedInLink": "Linkedin link must be a valid uri"
 *               }
 *        '404':
 *         description: User not found.
 */
router.put('/public', profileController.updateProfile);

module.exports = router;
