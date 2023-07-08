import { paginationFields } from '../../../constant/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponce';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { studentService } from './student.services';
import { Request, Response } from 'express';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await studentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Students retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await studentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrieved successfully !',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await studentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student deleted successfully !',
    data: result,
  });
});


const updateStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body; 
  
    const result = await studentService.updateStudent(id, updatedData);
  
    sendResponse<IStudent>(res, {
      statusCode: 200,
      success: true,
      message: 'Student updated successfully !',
      data: result || null,
    });
  });

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};




