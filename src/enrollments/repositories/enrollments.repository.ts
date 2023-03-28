import { InjectKnex, Knex } from 'nestjs-knex';

export class EnrollmentsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllEnrollments() {
    return this.knex('enrollments as ENR')
      .select(
        'USR.user_id as userID',
        'AGG.age_group_id as ageGroupID',
        'SPR.sport_id as sportID',
        'CLS.class_id as classID',
        'USR.user_id as userID',
        'USR.email as userEmail',
        'AGG.name as ageGroup',
        'CLS.duration as classDuration',
        'CLS.schedule as classSchedule',
        'SPR.name as sportName',
        'SPR.description as sportDescription',
      )
      .join('users as USR', 'USR.user_id', 'ENR.user_id')
      .join('classes as CLS', 'CLS.class_id', 'ENR.class_id')
      .join('sports as SPR', 'CLS.sport_id', 'SPR.sport_id')
      .join('age_groups as AGG', 'AGG.age_group_id', 'CLS.age_group_id');
  }

  getEnrollmentById(enrollmentID: number) {
    return this.getAllEnrollments()
      .where('enrollment_id', enrollmentID)
      .first();
  }

  getEnrollmentsByUserId(userID: number) {
    return this.getAllEnrollments().where('USR.user_id', userID);
  }

  createEnrollment(userID: number, classID: number) {
    return this.knex('enrollments').insert({
      user_id: userID,
      class_id: classID,
    });
  }

  deleteEnrollmentByID(enrollmentID: number) {
    return this.knex('enrollments')
      .where('enrollment_id', enrollmentID)
      .delete();
  }

  deleteEnrollmentByUserAndClassID(userID: number, classID: number) {
    return this.knex('enrollments')
      .where('user_id', userID)
      .andWhere('class_id', classID)
      .delete();
  }

  getEnrollmentByUserAndClassID(userID: number, classID: number) {
    return this.getAllEnrollments()
      .where('USR.user_id', userID)
      .andWhere('CLS.class_id', classID)
      .first();
  }
}
