import { BadRequestException, Injectable } from '@nestjs/common';
import { ClassesRepository } from 'src/classes/repositories/classes.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { EnrollmentsRepository } from './repositories/enrollments.repository';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly enrollmentsRepository: EnrollmentsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly classesRepository: ClassesRepository,
  ) {}

  getAllEnrollments() {
    return this.enrollmentsRepository.getAllEnrollments();
  }

  getEnrollmentById(enrollmentId: number) {
    return this.enrollmentsRepository.getEnrollmentById(enrollmentId);
  }

  private getEnrollmentsByUserId(userId: number) {
    return this.enrollmentsRepository.getEnrollmentsByUserId(userId);
  }

  private async checkMaxEnrollmentForUser(userId: number) {
    const MAX_ENROLLMENTS = 2;
    const userEnrollments = await this.getEnrollmentsByUserId(userId);

    if (userEnrollments.length >= MAX_ENROLLMENTS) {
      throw new BadRequestException(
        `User cannot be enrolled in more than ${MAX_ENROLLMENTS} classes at the same time`,
      );
    }
  }

  private getEnrollmentsByClassId(classId: number) {
    return this.enrollmentsRepository.getEnrollmentsByClassId(classId);
  }

  private async checkMaxEnrollmentForClass(classId: number) {
    const MAX_ENROLLMENTS = 10;
    const userEnrollments = await this.getEnrollmentsByClassId(classId);

    if (userEnrollments.length >= MAX_ENROLLMENTS) {
      throw new BadRequestException(
        `Class cannot have more than ${MAX_ENROLLMENTS} users enrolled at the same time`,
      );
    }
  }

  private async checkAgeGroup(userId: number, classId: number) {
    const selectedUser = await this.usersRepository.getUserById(userId);
    const selectedClass = await this.classesRepository.getClassById(classId);

    if (selectedUser.ageGroupId !== selectedClass.ageGroupId) {
      throw new BadRequestException('User age group does not match class');
    }
  }

  private async checkUserEnrolled(userId: number, classId: number) {
    const userEnrollment =
      await this.enrollmentsRepository.getEnrollmentByUserAndClassId(
        userId,
        classId,
      );

    if (userEnrollment) {
      throw new BadRequestException('User already enrolled in specified class');
    }
  }

  async enrollUser(userId: number, classId: number) {
    await this.checkAgeGroup(userId, classId);
    await this.checkUserEnrolled(userId, classId);
    await this.checkMaxEnrollmentForUser(userId);
    await this.checkMaxEnrollmentForClass(classId);
    return this.enrollmentsRepository.createEnrollment(userId, classId);
  }

  private async checkUserNotEnrolled(userId: number, classId: number) {
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
    await this.checkUserNotEnrolled(userId, classId);
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
