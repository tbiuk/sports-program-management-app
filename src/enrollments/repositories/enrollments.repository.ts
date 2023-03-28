import { InjectKnex, Knex } from 'nestjs-knex';

export class EnrollmentsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllEnrollments() {
    return this.knex('enrollments as ENR')
      .select(
        'USR.user_id as userId',
        'AGG.age_group_id as ageGroupId',
        'SPR.sport_id as sportId',
        'CLS.class_id as classId',
        'USR.user_id as userId',
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

  getEnrollmentById(enrollmentId: number) {
    return this.getAllEnrollments()
      .where('enrollment_id', enrollmentId)
      .first();
  }

  getEnrollmentsByUserId(userId: number) {
    return this.getAllEnrollments().where('USR.user_id', userId);
  }

  createEnrollment(userId: number, classId: number) {
    return this.knex('enrollments').insert({
      user_id: userId,
      class_id: classId,
    });
  }

  deleteEnrollmentById(enrollmentId: number) {
    return this.knex('enrollments')
      .where('enrollment_id', enrollmentId)
      .delete();
  }

  deleteEnrollmentByUserAndClassId(userId: number, classId: number) {
    return this.knex('enrollments')
      .where('user_id', userId)
      .andWhere('class_id', classId)
      .delete();
  }

  getEnrollmentByUserAndClassId(userId: number, classId: number) {
    return this.getAllEnrollments()
      .where('USR.user_id', userId)
      .andWhere('CLS.class_id', classId)
      .first();
  }
}
