import { Module } from '@nestjs/common';
import { ClassesModule } from 'src/classes/classes.module';
import { SportsModule } from 'src/sports/sports.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './repositories/comments.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  imports: [ClassesModule, SportsModule],
})
export class CommentsModule {}
