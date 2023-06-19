import { SortOrder } from "mongoose";
import { IStudent, IStudentFilters } from "./student.interface";
import { Student } from "./student.model";
import { studentSearchableFields } from "./student.constant";
import calculatePagination from "../../../helpers/paginationHelpers";
import { IGenericStudentResponse } from "../../../interfaces/ICommon";
import { IPaginationOPtion } from "../../../interfaces/IPagination";




const getAllStudents = async (
    filters: IStudentFilters,
    paginationOptions: Partial<IPaginationOPtion>
  ): Promise<IGenericStudentResponse<IStudent[] >> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
  
    const andConditions = [];
  
    if (searchTerm) {
      andConditions.push({
        $or: studentSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
  
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  
    const sortConditions: { [key: string]: SortOrder } = {};
  
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
  
    const result = await Student.find(whereConditions)
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
  
    const total = await Student.countDocuments(whereConditions);
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
  
  const getSingleStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findOne({ id })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
    return result;
  };
  


  const deleteStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findByIdAndDelete(id)
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
    return result;
  };
export const studentService = {getSingleStudent,getAllStudents,deleteStudent}