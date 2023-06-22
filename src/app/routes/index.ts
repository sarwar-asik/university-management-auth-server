import express from 'express';
import { UserRouter } from '../modules/users/user.route';
import { semesterRouter } from '../modules/academicSemister/academicSemester.route';
import { facultyRouter } from '../modules/academicFaculty/acdemicFaculty.router';
import { DepartmentRouter } from '../modules/academicDepartment/acdemicDept.router';
import { studentRouter } from '../modules/student/student.rout';
import { AuthRouter } from '../modules/auth/auth.route';

const router = express.Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/semester',
    route: semesterRouter,
  },
  {
    path: '/faculty',
    route: facultyRouter,
  },
  {
    path: '/department',
    route: DepartmentRouter,
  },
  {
    path: '/students',
    route:studentRouter,
  },
  {
    path: '/auth',
    route:AuthRouter,
  },
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
