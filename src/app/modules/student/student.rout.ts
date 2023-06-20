import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlesWare/validateUserRequest';
import { StudentValidaion } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getAllStudents);
router.get('/', StudentController.getAllStudents);
router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);

// router.get("/",userController.getUser)

export const studentRouter = router;
