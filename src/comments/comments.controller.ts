import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  getCommentById(@Param('id') commentId: number) {
    return this.commentsService.getCommentById(commentId);
  }

  @Post()
  createComment(
    @Body('classId') classId: number,
    @Body('userId') userId: number,
    @Body('comment') comment: string,
  ) {
    return this.commentsService.createComment(classId, userId, comment);
  }

  @Put(':id')
  updateComment(
    @Param('id') commentId: number,
    @Body('comment') comment: string,
  ) {
    return this.commentsService.updateComment(commentId, comment);
  }

  @Delete(':id')
  deleteComment(@Param('id') commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
