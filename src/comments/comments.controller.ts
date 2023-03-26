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
  getCommentById(@Param('id') id: number) {
    return this.commentsService.getCommentById(id);
  }

  @Post()
  createComment(
    @Body('classID') classID: number,
    @Body('userID') userID: number,
    @Body('comment') comment: string,
  ) {
    return this.commentsService.createComment(classID, userID, comment);
  }

  @Put(':id')
  updateComment(@Param('id') id: number, @Body('comment') comment: string) {
    return this.commentsService.updateComment(id, comment);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: number) {
    return this.commentsService.deleteComment(id);
  }
}
