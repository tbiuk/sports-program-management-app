import { Injectable } from '@nestjs/common';
import { EnrollmentsRepository } from './repositories/enrollments.repository';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly enrollmentsRepository: EnrollmentsRepository) {}

  getAllEnrollments() {
    return this.enrollmentsRepository.getAllEnrollments();
  }

  getEnrollmentById(id: number) {
    return this.enrollmentsRepository.getEnrollmentById(id);
  }

  createEnrollment(userID: number, classID: number) {
    return this.enrollmentsRepository.createEnrollment(userID, classID);
  }

  updateEnrollment(id: number, userID: number, classID: number) {
    return this.enrollmentsRepository.updateEnrollment(id, userID, classID);
  }

  deleteEnrollment(id: number) {
    return this.enrollmentsRepository.deleteEnrollment(id);
  }

  getEnrollmentByUserAndClassID(userID: number, classID: number) {
    return this.enrollmentsRepository.getEnrollmentByUserAndClassID(
      userID,
      classID,
    );
  }
}
