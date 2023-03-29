import { Module } from '@nestjs/common';
import { AgeGroupsModule } from 'src/age-groups/age-groups.module';
import { SportsModule } from 'src/sports/sports.module';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassesRepository } from './repositories/classes.repository';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
  exports: [ClassesService, ClassesRepository],
  imports: [SportsModule, AgeGroupsModule],
})
export class ClassesModule {}
