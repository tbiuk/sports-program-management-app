import { InjectKnex, Knex } from 'nestjs-knex';

export class CommentsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllComments() {
    return this.knex('comments as COM')
      .select(
        'COM.comment_id as commentID',
        'COM.comment',
        'AGG.age_group_id as ageGroupID',
        'SPR.sport_id as sportID',
        'CLS.class_id as classID',
        'AGG.name as ageGroup',
        'CLS.duration as classDuration',
        'CLS.schedule as classSchedule',
        'SPR.name as sportName',
        'SPR.description as sportDescription',
      )
      .join('classes as CLS', 'CLS.class_id', 'COM.class_id')
      .join('sports as SPR', 'CLS.sport_id', 'SPR.sport_id')
      .join('age_groups as AGG', 'AGG.age_group_id', 'CLS.age_group_id');
  }

  getCommentById(id: number) {
    return this.getAllComments().where('comment_id', id).first();
  }

  createComment(classID: number, userID: number, comment: string) {
    return this.knex('comments').insert({
      class_id: classID,
      user_id: userID,
      comment,
    });
  }

  updateComment(id: number, comment: string) {
    return this.knex('comments').update({ comment }).where('comment_id', id);
  }

  deleteComment(id: number) {
    return this.knex('comments').where('comment_id', id).delete();
  }
}
