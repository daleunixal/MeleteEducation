import { Router } from 'express';
import { ensureAuthenticatedMiddleware } from '../../../utils/ensure-authenticated.middleware';
import { getAllCourses } from '../controllers/course/course-all.observe.controller';
import { createCourse, createPart } from '../controllers/course/course-creator.controller';

const _courseRoutes = Router();


// _courseRoutes.get('/api/v1/course/go/:courseId', ensureAuthenticatedMiddleware, userInfoController)
// _courseRoutes.get('/api/v1/course/getInfo/:courseId', loginUser)
_courseRoutes.get('/api/v1/course/getAll', getAllCourses)
_courseRoutes.post('/api/v1/course/create', createCourse)
_courseRoutes.post('/api/v1/course/createPart', createPart)


export const CourseRoute = _courseRoutes
