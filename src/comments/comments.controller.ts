import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClassExistsOrUndefinedPipe } from 'src/classes/pipes/class-exists-or-undefined.pipe';
import { ClassExistsPipe } from 'src/classes/pipes/class-exists.pipe';
import { MutuallyExclusiveQueryParamsInterceptor } from 'src/common/interceptors/mutually-exclusive-query-params.interceptor';
import { ValidBodyParamsInterceptor } from 'src/common/interceptors/valid-body-params.interceptor';
import { ValidQueryParamsInterceptor } from 'src/common/interceptors/valid-query-params.interceptor';
import { NotUndefinedPipe } from 'src/common/pipes/not-undefined.pipe';
import { SportExistsOrUndefinedPipe } from 'src/sports/pipes/sport-exists-or-undefined.pipe';
import { CommentsService } from './comments.service';
import { CommentExistsPipe } from './pipes/comment-exists.pipe';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    new MutuallyExclusiveQueryParamsInterceptor(['sport', 'class']),
  )
  @UseInterceptors(new ValidQueryParamsInterceptor(['sport', 'class']))
  getComments(
    @Query('sport', SportExistsOrUndefinedPipe) sportName: string,
    @Query('class', ClassExistsOrUndefinedPipe) classId: number,
  ) {
    if (sportName) return this.commentsService.getCommentsForSport(sportName);
    if (classId) return this.commentsService.getCommentsForClass(classId);
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getCommentById(@Param('id', CommentExistsPipe) commentId: number) {
    return this.commentsService.getCommentById(commentId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['class', 'comment']))
  createComment(
    @Request() req,
    @Body('class', NotUndefinedPipe, ClassExistsPipe) classId: number,
    @Body('comment', NotUndefinedPipe) comment: string,
  ) {
    return this.commentsService.createComment(classId, req.user.id, comment);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  deleteComment(@Param('id', CommentExistsPipe) commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
