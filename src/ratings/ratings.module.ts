import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { RatingsRepository } from './repositories/ratings.repository';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService, RatingsRepository],
})
export class RatingsModule {}
