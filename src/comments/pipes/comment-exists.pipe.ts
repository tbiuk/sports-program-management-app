import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CommentsRepository } from '../repositories/comments.repository';

@Injectable()
export class CommentExistsPipe implements PipeTransform {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async transform(value: number) {
    const comment = await this.commentsRepository.getCommentById(value);
    if (!comment) {
      throw new BadRequestException(`Comment with id ${value} does not exist`);
    }
    return value;
  }
}
