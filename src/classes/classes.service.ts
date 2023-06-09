import { BadRequestException, Injectable } from '@nestjs/common';
import { ClassesRepository } from './classes.repository';

@Injectable()
export class ClassesService {
  constructor(private readonly classesRepository: ClassesRepository) {}

  getFilteredClasses(sportNames: string[], ageGroupNames: string[]) {
    return this.classesRepository.getFilteredClasses(sportNames, ageGroupNames);
  }

  getClassById(classId: number) {
    return this.classesRepository.getClassById(classId);
  }

  createClass(
    sportId: number,
    ageGroupId: number,
    duration: string,
    schedule: string,
  ) {
    return this.classesRepository.createClass(
      sportId,
      ageGroupId,
      duration,
      schedule,
    );
  }

  async checkCanUpdateClass(
    classId: number,
    ageGroupId: number,
    sportId: number,
  ) {
    const classEnrollments = await this.classesRepository.getClassEnrollments(
      classId,
    );

    if (!classEnrollments.length) return;

    const classToUpdate = await this.classesRepository.getClassById(classId);

    if (sportId && classToUpdate.sportId != sportId) {
      throw new BadRequestException(
        `Cannot edit sport of class with active users`,
      );
    }

    if (ageGroupId && classToUpdate.ageGroupId != ageGroupId) {
      throw new BadRequestException(
        `Cannot edit age group of class with active users`,
      );
    }
  }

  async updateClass(
    classId: number,
    sportId: number,
    ageGroupId: number,
    duration: string,
    schedule: string,
  ) {
    await this.checkCanUpdateClass(classId, ageGroupId, sportId);
    return this.classesRepository.updateClass(
      classId,
      sportId,
      ageGroupId,
      duration,
      schedule,
    );
  }

  private async checkCanDeleteClass(classId: number) {
    const classEnrollments = await this.classesRepository.getClassEnrollments(
      classId,
    );

    if (classEnrollments.length) {
      throw new BadRequestException(`Cannot delete class with enrolled users`);
    }
  }

  async deleteClass(classId: number) {
    await this.checkCanDeleteClass(classId);
    return this.classesRepository.deleteClass(classId);
  }
}
