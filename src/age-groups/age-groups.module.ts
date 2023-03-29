import { Module } from '@nestjs/common';
import { AgeGroupsService } from './age-groups.service';
import { AgeGroupsRepository } from './repositories/age-groups.repository';
import { AgeGroupsController } from './age-groups.controller';

@Module({
  providers: [AgeGroupsService, AgeGroupsRepository],
  exports: [AgeGroupsService, AgeGroupsRepository],
  controllers: [AgeGroupsController],
})
export class AgeGroupsModule {}
