/* eslint-disable no-console */

import { IUser } from './user.interface';


import { generateStudentId } from './user.utils';

import { AcademicSemester } from '../academicSemister/AcademicSemesterModel';
import { IStudent } from '../student/student.interface';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import { User } from './user.model';
import config from '../../../config';
// import bcrypt from 'bcrypt';

const createStudentServices = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user?.password) {
    user.password = config.default_user_pass as string;
  }








  // console.log(student, 'from services',user);
  user.role = 'student';

  console.log(student.academicSemester, 'student');

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  );
  // console.log(academicsemester, 'sssssssssss');

  if (!academicsemester) {
    throw new ApiError(401, 'Cannot get academic semester student');
  }

  // console.log(academicsemester);
 
  let newUserAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;
    const createStudent = await Student.create([student], { session });
    if (!createStudent.length) {
      throw new ApiError(401, 'Failed to create student');
    }

    user.student = createStudent[0]._id;
    const newUser = await User.create([user], { session });
    // console.log(newUser,"asssssssssssss");
    if (!newUser.length) {
      throw new ApiError(401, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    console.log(error,'error from user-service');
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = { createStudentServices };
// export default { createUser}
