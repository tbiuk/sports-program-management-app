import { BadRequestException, Injectable } from '@nestjs/common';
import { EnrollmentsRepository } from './repositories/enrollments.repository';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly enrollmentsRepository: EnrollmentsRepository) {}

  getAllEnrollments() {
    return this.enrollmentsRepository.getAllEnrollments();
  }

  getEnrollmentById(enrollmentID: number) {
    return this.enrollmentsRepository.getEnrollmentById(enrollmentID);
  }

  private getEnrollmentsByUserId(userID: number) {
    return this.enrollmentsRepository.getEnrollmentsByUserId(userID);
  }

  private async checkMaxClassEnrollment(userID: number) {
    const MAX_ENROLLMENTS = 2;
    const userEnrollments = await this.getEnrollmentsByUserId(userID);

    if (userEnrollments.length >= MAX_ENROLLMENTS) {
      throw new BadRequestException(
        'User cannot be enrolled in more than two sports at the same time',
      );
    }
  }

  async enrollUser(userID: number, classID: number) {
    await this.checkMaxClassEnrollment(userID);
    return this.enrollmentsRepository.createEnrollment(userID, classID);
  }

  private async checkUserEnrolled(userID: number, classID: number) {
    const userEnrollment =
      await this.enrollmentsRepository.getEnrollmentByUserAndClassID(
        userID,
        classID,
      );

    if (!userEnrollment) {
      throw new BadRequestException('User is not enrolled in specified class');
    }
  }

  async unenrollUser(userID: number, classID: number) {
    await this.checkUserEnrolled(userID, classID);
    return this.enrollmentsRepository.deleteEnrollmentByUserAndClassID(
      userID,
      classID,
    );
  }

  deleteEnrollment(enrollmentID: number) {
    return this.enrollmentsRepository.deleteEnrollmentByID(enrollmentID);
  }

  getEnrollmentByUserAndClassID(userID: number, classID: number) {
    return this.enrollmentsRepository.getEnrollmentByUserAndClassID(
      userID,
      classID,
    );
  }
}
