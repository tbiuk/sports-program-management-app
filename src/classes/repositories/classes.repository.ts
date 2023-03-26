import { InjectKnex, Knex } from 'nestjs-knex';

export class ClassesRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllClasses() {
    return this.knex('classes as CLS')
      .select(
        'SPR.sport_id as sportID',
        'CLS.class_id as classID',
        'AGG.name as ageGroup',
        'CLS.duration as classDuration',
        'CLS.schedule as classSchedule',
        'SPR.name as sportName',
        'SPR.description as sportDescription',
      )
      .join('sports as SPR', 'CLS.sport_id', 'SPR.sport_id')
      .join('age_groups as AGG', 'AGG.age_group_id', 'CLS.age_group_id');
  }

  getClassById(id: number) {
    return this.getAllClasses().where('class_id', id).first();
  }

  createClass(
    sportID: number,
    ageGroupID: number,
    duration: string,
    schedule: string,
  ) {
    return this.knex('classes').insert({
      sport_id: sportID,
      age_group_id: ageGroupID,
      duration,
      schedule,
    });
  }

  updateClass(
    id: number,
    sportID: number,
    ageGroupID: number,
    duration: string,
    schedule: string,
  ) {
    return this.knex('classes')
      .update({
        sport_id: sportID,
        age_group_id: ageGroupID,
        duration,
        schedule,
      })
      .where('class_id', id);
  }

  deleteClass(id: number) {
    return this.knex('classes').where('class_id', id).delete();
  }
}
