import { Injectable } from '@nestjs/common';
import { ClassesRepository } from './repositories/classes.repository';

@Injectable()
export class ClassesService {
  constructor(private readonly classesRepository: ClassesRepository) {}

  getAllClasses() {
    return this.classesRepository.getAllClasses();
  }

  getClassById(id: number) {
    return this.classesRepository.getClassById(id);
  }

  createClass(
    sportID: number,
    ageGroupID: number,
    duration: string,
    schedule: string,
  ) {
    return this.classesRepository.createClass(
      sportID,
      ageGroupID,
      duration,
      schedule,
    );
  }

  updateClass(
    id: number,
    sportID: number,
    ageGroupID: number,
    duration: string,
    schedule: string,
  ) {
    return this.classesRepository.updateClass(
      id,
      sportID,
      ageGroupID,
      duration,
      schedule,
    );
  }

  deleteClass(id: number) {
    return this.classesRepository.deleteClass(id);
  }
}
