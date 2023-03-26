import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsRepository } from './repositories/enrollments.repository';

@Module({
  providers: [EnrollmentsService, EnrollmentsRepository],
  controllers: [EnrollmentsController],
})
export class EnrollmentsModule {}
