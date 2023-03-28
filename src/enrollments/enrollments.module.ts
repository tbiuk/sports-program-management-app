import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsRepository } from './repositories/enrollments.repository';
import { ClassesModule } from 'src/classes/classes.module';

@Module({
  imports: [ClassesModule],
  providers: [EnrollmentsService, EnrollmentsRepository],
  controllers: [EnrollmentsController],
  exports: [EnrollmentsService, EnrollmentsRepository],
})
export class EnrollmentsModule {}
