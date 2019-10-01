const express = require('express');
const router = express.Router();

const { courseController } = require('../controllers');
/**
 * @swagger
 * /api/course/preview/{courseId}:
 *    get:
 *     name: Get Course
 *     summary: Get Course Preview
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: courseId
 *     responses:
 *        '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                course:
 *                  title:
 *                    type:string
 *                  description:
 *                    type:string
 *                  numberOfLessons:
 *                    type:integer
 *                  rating:
 *                    type:number
 *                  updatedAt:
 *                    type:string
 *             example:
 *              {
 *                "title":"React",
 *                "description":"Some description",
 *                "numberOfLessons": 44,
 *                "rating": 3.3,
 *                "updatedAt":"2019-10-01T11:49:56.003Z",
 *              }
 *        '400':
 *         description: Course not found.
 */
router.get('/preview/:courseId', courseController.getCoursePreview);

module.exports = router;
