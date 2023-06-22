import express from 'express';
import validateRequest from '../../middlesWare/validateUserRequest';
import { academicFacultyValidation } from './acdemicFaculty.validation';
import { FacultyController } from './acdemicFaculty.controller';
import auth from '../../middlesWare/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createFacultySchema),
  auth(ENUM_USER_ROLE.ADMIN),
  FacultyController.createFacultyController
);

router.get('/All-faculty',
auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
 FacultyController.getAllPaginationFaculty
 );

router.patch('/:id',
validateRequest(academicFacultyValidation.createFacultySchema),
auth(ENUM_USER_ROLE.ADMIN),
FacultyController.UpdateFacultyController);

 router.delete('/:id',
 auth(ENUM_USER_ROLE.ADMIN),
 FacultyController.deleteSingleFaculty)

router.get('/:id',FacultyController.getSingleFaculty)
router.get('/', FacultyController.getAllFaculty)




export const facultyRouter = router;
