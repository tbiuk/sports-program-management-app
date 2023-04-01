import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsRepository } from './enrollments.repository';
import { ClassesModule } from 'src/classes/classes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ClassesModule, UsersModule],
  providers: [EnrollmentsService, EnrollmentsRepository],
  controllers: [EnrollmentsController],
  exports: [EnrollmentsService, EnrollmentsRepository],
})
export class EnrollmentsModule {}
