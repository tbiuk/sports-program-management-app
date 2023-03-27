import { Module } from '@nestjs/common';
import { SportsRepository } from './repositories/sports.repository';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';

@Module({
  controllers: [SportsController],
  providers: [SportsService, SportsRepository],
  exports: [SportsService, SportsRepository],
})
export class SportsModule {}
