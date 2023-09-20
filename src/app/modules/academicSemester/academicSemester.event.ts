/* eslint-disable no-console */
import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_SEMESTER_CREATED } from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_CREATED,
    async (event: string) => {
      const data: IAcademicSemesterCreatedEvent = JSON.parse(event);
      console.log(data);
    }
  );
};

export default initAcademicSemesterEvents;
