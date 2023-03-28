import { Injectable } from '@nestjs/common';
import { ClassesRepository } from './repositories/classes.repository';

@Injectable()
export class ClassesService {
  constructor(private readonly classesRepository: ClassesRepository) {}

  getFilteredClasses(sportNames: string, ageNames: string) {
    const sportNamesArray = sportNames ? sportNames.split(',') : [];
    const ageNamesArray = ageNames ? ageNames.split(',') : [];

    return this.classesRepository.getFilteredClasses(
      sportNamesArray,
      ageNamesArray,
    );
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

  updateClass(
    classId: number,
    sportId: number,
    ageGroupId: number,
    duration: string,
    schedule: string,
  ) {
    return this.classesRepository.updateClass(
      classId,
      sportId,
      ageGroupId,
      duration,
      schedule,
    );
  }

  deleteClass(classId: number) {
    return this.classesRepository.deleteClass(classId);
  }
}
