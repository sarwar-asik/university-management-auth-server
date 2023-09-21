/* eslint-disable no-console */
import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_SEMESTER_CREATED, EVENT_ACADEMIC_SEMESTER_DELETED, EVENT_ACADEMIC_SEMESTER_UPDATED } from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const initAcademicSemesterEvents = () => {

  // fro create academicSemester ///

  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_CREATED,
    async (event: string) => {
      const data: IAcademicSemesterCreatedEvent = JSON.parse(event);

      await AcademicSemesterService.createSemesterFromEvent(data)
      console.log(data,"created data");
    }
  );

// for update academicSemester ///

  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_UPDATED,
    async (event: string) => {
      const data: IAcademicSemesterCreatedEvent = JSON.parse(event);

      await AcademicSemesterService.updateOneIntoDbFromEvent(data)
      console.log(data,"updated data ");
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_DELETED,
    async (event: string) => {
      const data: IAcademicSemesterCreatedEvent = JSON.parse(event);
      console.log(data,"deleted data ");
    }
  );



};

export default initAcademicSemesterEvents;
