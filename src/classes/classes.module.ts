import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassesRepository } from './repositories/classes.repository';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
  exports: [ClassesService, ClassesRepository],
})
export class ClassesModule {}
