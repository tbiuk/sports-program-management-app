import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './repositories/comments.repository';

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

  updateComment(commentId: number, updatedComment: any) {
    return this.commentsRepository.updateComment(commentId, updatedComment);
  }

  deleteComment(commentId: number) {
    return this.commentsRepository.deleteComment(commentId);
  }
}
