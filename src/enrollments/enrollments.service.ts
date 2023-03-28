import { BadRequestException, Injectable } from '@nestjs/common';
import { EnrollmentsRepository } from './repositories/enrollments.repository';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly enrollmentsRepository: EnrollmentsRepository) {}

  getAllEnrollments() {
    return this.enrollmentsRepository.getAllEnrollments();
  }

  getEnrollmentById(enrollmentId: number) {
    return this.enrollmentsRepository.getEnrollmentById(enrollmentId);
  }

  private getEnrollmentsByUserId(userId: number) {
    return this.enrollmentsRepository.getEnrollmentsByUserId(userId);
  }

  private async checkMaxClassEnrollment(userId: number) {
    const MAX_ENROLLMENTS = 2;
    const userEnrollments = await this.getEnrollmentsByUserId(userId);

    if (userEnrollments.length >= MAX_ENROLLMENTS) {
      throw new BadRequestException(
        'User cannot be enrolled in more than two sports at the same time',
      );
    }
  }

  async enrollUser(userId: number, classId: number) {
    await this.checkMaxClassEnrollment(userId);
    return this.enrollmentsRepository.createEnrollment(userId, classId);
  }

  private async checkUserEnrolled(userId: number, classId: number) {
    const userEnrollment =
      await this.enrollmentsRepository.getEnrollmentByUserAndClassId(
        userId,
        classId,
      );

    if (!userEnrollment) {
      throw new BadRequestException('User is not enrolled in specified class');
    }
  }

  async unenrollUser(userId: number, classId: number) {
    await this.checkUserEnrolled(userId, classId);
    return this.enrollmentsRepository.deleteEnrollmentByUserAndClassId(
      userId,
      classId,
    );
  }

  deleteEnrollment(enrollmentId: number) {
    return this.enrollmentsRepository.deleteEnrollmentById(enrollmentId);
  }

  getEnrollmentByUserAndClassId(userId: number, classId: number) {
    return this.enrollmentsRepository.getEnrollmentByUserAndClassId(
      userId,
      classId,
    );
  }
}
