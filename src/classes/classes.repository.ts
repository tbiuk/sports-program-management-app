import { InjectKnex, Knex } from 'nestjs-knex';

export class ClassesRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllClasses() {
    return this.knex('classes as CLS')
      .select(
        'SPR.sport_id as sportId',
        'CLS.class_id as classId',
        'AGG.name as ageGroup',
        'AGG.age_group_id as ageGroupId',
        'CLS.duration as classDuration',
        'CLS.schedule as classSchedule',
        'SPR.name as sportName',
        'SPR.description as sportDescription',
      )
      .join('sports as SPR', 'CLS.sport_id', 'SPR.sport_id')
      .join('age_groups as AGG', 'AGG.age_group_id', 'CLS.age_group_id');
  }

  getClassById(classId: number) {
    return this.getAllClasses().where('class_id', classId).first();
  }

  getFilteredClasses(sportNamesArray: string[], ageNamesArray: string[]) {
    let query = this.getAllClasses();

    if (sportNamesArray.length) {
      query = query.whereIn('SPR.name', sportNamesArray);
    }

    if (ageNamesArray.length) {
      query = query.whereIn('AGG.name', ageNamesArray);
    }

    return query;
  }

  createClass(
    sportId: number,
    ageGroupId: number,
    duration: string,
    schedule: string,
  ) {
    return this.knex('classes').insert({
      sport_id: sportId,
      age_group_id: ageGroupId,
      duration,
      schedule,
    });
  }

  updateClass(
    classId: number,
    sportId: number,
    ageGroupId: number,
    duration: string,
    schedule: string,
  ) {
    return this.knex('classes')
      .update({
        sport_id: sportId,
        age_group_id: ageGroupId,
        duration,
        schedule,
      })
      .where('class_id', classId);
  }

  deleteClass(classId: number) {
    return this.knex('classes').where('class_id', classId).delete();
  }

  getClassEnrollments(classId: number) {
    return this.knex('enrollments').where('class_id', classId);
  }
}
