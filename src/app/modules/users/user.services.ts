/* eslint-disable no-console */

import { IUser } from './user.interface';

import config from '../../../config.ts/index';
import { generateFacultyId,  } from './user.utils';

import { AcademicSemester } from '../academicSemister/AcademicSemesterModel';
import { IStudent } from '../student/student.interface';

const createStudentServices = async (
  student: IStudent,
  user:IUser
  ): Promise<IUser | null> => {

  if (!user?.password) {
    user.password = config.default_user_pass as string;
  }
  
  const id = await generateFacultyId();

  student.id = id;

  console.log(student, 'from services');
  user.role='student'
  const academicSemester = await AcademicSemester.findById(student.academicSemester)

  console.log(academicSemester);





  // const createdUser = await User.create(user);
  // if (!createdUser) {
  //   throw new ApiError(400, 'Failed to create new User');
  // }
  // return createdUser;
  return null
};

export const UserService = { createStudentServices };
// export default { createUser}
