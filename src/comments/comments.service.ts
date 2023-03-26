import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getAllComments() {
    return this.commentsRepository.getAllComments();
  }

  getCommentById(id: number) {
    return this.commentsRepository.getCommentById(id);
  }

  createComment(classID: number, userID: number, comment: string) {
    return this.commentsRepository.createComment(classID, userID, comment);
  }

  updateComment(id: number, updatedComment: any) {
    return this.commentsRepository.updateComment(id, updatedComment);
  }

  deleteComment(id: number) {
    return this.commentsRepository.deleteComment(id);
  }
}
