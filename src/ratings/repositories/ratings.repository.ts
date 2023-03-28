import { InjectKnex, Knex } from 'nestjs-knex';

export class RatingsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllRatings() {
    return this.knex('ratings as RAT')
      .select(
        'RAT.rating_id as ratingId',
        'RAT.rating',
        'AGG.age_group_id as ageGroupId',
        'SPR.sport_id as sportId',
        'CLS.class_id as classId',
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

  getRatingById(ratingId: number) {
    return this.getAllRatings().where('rating_id', ratingId).first();
  }

  getRatingsForClass(ratingId: number) {
    return this.getAllRatings().where('CLS.class_id', ratingId);
  }

  getRatingsForSport(sportName: string) {
    return this.getAllRatings().where('SPR.name', sportName);
  }

  async upsertRating(classId: number, userId: number, rating: number) {
    const [existingRating] = await this.knex('ratings')
      .where('user_id', userId)
      .andWhere('class_id', classId);

    if (!existingRating)
      return this.knex('ratings').insert({
        class_id: classId,
        user_id: userId,
        rating,
      });

    return this.knex('ratings')
      .update({
        class_id: classId,
        user_id: userId,
        rating,
      })
      .where('rating_id', existingRating.rating_id);
  }

  deleteRating(ratingId: number) {
    return this.knex('ratings').where('rating_id', ratingId).delete();
  }
}
