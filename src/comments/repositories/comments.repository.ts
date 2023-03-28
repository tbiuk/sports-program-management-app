import { InjectKnex, Knex } from 'nestjs-knex';

export class CommentsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllComments() {
    return this.knex('comments as COM')
      .select(
        'COM.comment_id as commentId',
        'COM.comment',
        'AGG.age_group_id as ageGroupId',
        'SPR.sport_id as sportId',
        'CLS.class_id as classId',
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

  getCommentById(commentId: number) {
    return this.getAllComments().where('comment_id', commentId).first();
  }

  createComment(classId: number, userId: number, comment: string) {
    return this.knex('comments').insert({
      class_id: classId,
      user_id: userId,
      comment,
    });
  }

  updateComment(commentId: number, comment: string) {
    return this.knex('comments')
      .update({ comment })
      .where('comment_id', commentId);
  }

  deleteComment(commentId: number) {
    return this.knex('comments').where('comment_id', commentId).delete();
  }
}
