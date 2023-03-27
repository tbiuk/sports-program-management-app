import { Module } from '@nestjs/common';
import { ClassesModule } from 'src/classes/classes.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { SportsModule } from 'src/sports/sports.module';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { RatingsRepository } from './repositories/ratings.repository';

@Module({
  imports: [ClassesModule, SportsModule, EnrollmentsModule],
  controllers: [RatingsController],
  providers: [RatingsService, RatingsRepository],
})
export class RatingsModule {}
