const express = require('express');
const router = express.Router();

const { courseController } = require('../controllers');
const jwtGuard = require('../middlewares/jwtGuard');
const { refreshToken } = require('../middlewares/refreshAccessToken');

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
 *             schemas:
 *                 Course:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     courseName:
 *                       type: string
 *                     description:
 *                       type: string
 *                     rating:
 *                       type: integer
 *                       format: double
 *                     numberOfEnrolledStudents:
 *                       type: integer
 *                     authors:
 *                       type: string
 *                     language:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date
 *                     updatedAt:
 *                       type: string
 *                       format: date
 *                     courseReviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           rating:
 *                             type: integer
 *                             format: double
 *                           text:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date
 *                           updatedAt:
 *                             type: string
 *                             format: date
 *                     profits:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           description:
 *                             type: string
 *             example:
 *              {
 *                "id": 1,
 *                "courseName": "test",
 *                "description": "test",
 *                "rating": 3.3,
 *                "numberOfEnrolledStudents": 15,
 *                "authors": "asdasd",
 *                "language": "eu",
 *                "createdAt": "2019-10-15T13:38:25.222Z",
 *                "updatedAt": "2019-10-15T13:38:25.222Z",
 *                "courseReviews": [
 *                  {
 *                    "id": 1,
 *                    "raiting": 4,
 *                    "text": "sdasdas",
 *                    "createdAt": "2019-10-15T13:38:25.222Z",
 *                    "updatedAt": "2019-10-15T13:38:25.222Z"
 *                  },
 *                  {
 *                    "id": 2,
 *                    "raiting": 3,
 *                    "text": "dasdasda",
 *                    "createdAt": "2019-10-15T13:38:25.222Z",
 *                    "updatedAt": "2019-10-15T13:38:25.222Z"
 *                  }
 *                ],
 *                "profits": [
 *                  {
 *                      "id": 1,
 *                      "description": "asdas"
 *                  },
 *                  {
 *                      "id": 2,
 *                      "description": "dsadasd"
 *                  },
 *                  {
 *                      "id": 3,
 *                      "description": "asdasd"
 *                  }
 *                ]
 *              }
 *        '400':
 *         description: Course not found.
 */
router.get('/preview/:courseId', courseController.getCoursePreview);


router.get('/', courseController.getCoursesByAttribute);

/**
 * @swagger
 * /api/course/carousel-courses/:
 *    get:
 *     name: Get Courses
 *     summary: Get Course For Carousel
 *     consumes:
 *       - application/json
 *    
 *     responses:
 *        '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                  course:
 *                    title:
 *                      type:string
 *                    description:
 *                      type:string
 *                    numberOfLessons:
 *                      type:integer
 *             example:
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *               - title: React
 *                 description: Some description
 *                 numberOfLessons: 44
 *        '400':
 *         description: Courses not found.
 */
router.get('/carousel/', courseController.getCoursesForCarousel);


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Bearer:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 * definitions:
 *      Subscription: 
 *        type: object
 *        properties:
 *          createdAt:
 *            type: string 
 *            format: dateTime
 *          updatedAt: 
 *            type: string
 *            format: dateTime
 *          id:
 *            type: integer
 *            format: int64
 *          userId:
 *            type: integer
 *            format: int64
 *          courseId:
 *            type: integer
 *            format: int64
 * /api/course/subscribe/{courseId}:
 *    post:
 *     security:
 *       - Bearer: []
 *     name: Subscribe Course
 *     summary: Create subscription for Course by User
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: courseId
 *         description: course id in DB
 *         required: true
 *         type: integer
 *         format: int32
 *     responses:
 *        '200':
 *         description: Basic Answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                status:
 *                  type: integer
 *                  format: int64
 *                statusMessage:
 *                  type: string
 *                message:
 *                  type: string
 *                data:
 *                  $ref: '#/definitions/Subscription'
 *             example: {
 *                "status": 201,
 *                "statusMessage": "Created",
 *                "message": "User has signatured",
 *                "data": {
 *                 "createdAt": "2019-10-29T08:56:53.253Z",
 *                 "updatedAt": "2019-10-29T08:56:53.253Z",
 *                 "id": 14,
 *                 "userId": 2,
 *                 "courseId": 6
 *                }
 *              }
 *        '400':
 *          description: User has already signed
 *        '404':
 *         description: Courses not found.
 */
router.post(
  '/subscribe/:courseId',
  jwtGuard,
  refreshToken,
  courseController.subscribeUserToCourse
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Bearer:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 * definitions:
 *      Subscription: 
 *        type: object
 *        properties:
 *          createdAt:
 *            type: string 
 *            format: dateTime
 *          updatedAt: 
 *            type: string
 *            format: dateTime
 *          id:
 *            type: integer
 *            format: int64
 *          userId:
 *            type: integer
 *            format: int64
 *          courseId:
 *            type: integer
 *            format: int64
 * /api/course/subscribe/check/{courseId}:
 *    get:
 *     security:
 *       - Bearer: []
 *     name: Check Subscribe Course
 *     summary: Check subscription for Course by User
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: courseId
 *         description: course id in DB
 *         required: true
 *         type: integer
 *         format: int32
 *     responses:
 *        '200':
 *         description: Basic Answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                status:
 *                  type: integer
 *                  format: int64
 *                statusMessage:
 *                  type: string
 *                message:
 *                  type: string
 *                data:
 *                  $ref: '#/definitions/Subscription'
 *             example: {
 *                "status": 200,
 *                "statusMessage": "Ok",
 *                "message": "User has already signed",
 *                "data": {
 *                 "createdAt": "2019-10-29T08:56:53.253Z",
 *                 "updatedAt": "2019-10-29T08:56:53.253Z",
 *                 "id": 14,
 *                 "userId": 2,
 *                 "courseId": 6
 *                }
 *              }
 *        '400':
 *          description: User has already signed
 *        '404':
 *         description: Courses not found.
 */


router.get(
  '/subscribe/check/:courseId',
  jwtGuard,
  refreshToken,
  courseController.getSubscriptionUserToCourse
);

module.exports = router;
