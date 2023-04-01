import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getAllComments() {
    return this.commentsRepository.getAllComments();
  }

  getCommentById(commentId: number) {
    return this.commentsRepository.getCommentById(commentId);
  }

  createComment(classId: number, userId: number, comment: string) {
    return this.commentsRepository.createComment(classId, userId, comment);
  }

  getCommentsForSport(sportName: string) {
    return this.commentsRepository.getCommentsForSport(sportName);
  }

  getCommentsForClass(classId: number) {
    return this.commentsRepository.getCommentsForClass(classId);
  }

  deleteComment(commentId: number) {
    return this.commentsRepository.deleteComment(commentId);
  }
}
