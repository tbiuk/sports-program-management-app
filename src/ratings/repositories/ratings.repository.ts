import { InjectKnex, Knex } from 'nestjs-knex';

export class RatingsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllRatings() {
    return this.knex('ratings as RAT')
      .select(
        'RAT.rating_id as ratingID',
        'RAT.rating',
        'AGG.age_group_id as ageGroupID',
        'SPR.sport_id as sportID',
        'CLS.class_id as classID',
        'AGG.name as ageGroup',
        'CLS.duration as classDuration',
        'CLS.schedule as classSchedule',
        'SPR.name as sportName',
        'SPR.description as sportDescription',
      )
      .join('classes as CLS', 'CLS.class_id', 'RAT.class_id')
      .join('sports as SPR', 'CLS.sport_id', 'SPR.sport_id')
      .join('age_groups as AGG', 'AGG.age_group_id', 'CLS.age_group_id');
  }

  getRatingById(id: number) {
    return this.getAllRatings().where('rating_id', id).first();
  }

  createRating(classID: number, userID: number, rating: number) {
    return this.knex('ratings').insert({
      class_id: classID,
      user_id: userID,
      rating,
    });
  }

  updateRating(id: number, rating: number) {
    return this.knex('ratings').update({ rating }).where('rating_id', id);
  }

  deleteRating(id: number) {
    return this.knex('ratings').where('rating_id', id).delete();
  }
}
