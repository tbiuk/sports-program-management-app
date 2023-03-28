import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  getFilteredClasses(
    @Query('sports') sportsList: string,
    @Query('age') ageList: string,
  ) {
    return this.classesService.getFilteredClasses(sportsList, ageList);
  }

  @Get(':id')
  getClassById(@Param('id') classId: number) {
    return this.classesService.getClassById(classId);
  }

  @Post()
  createClass(
    @Body('sportId') sportId: number,
    @Body('ageGroupId') ageGroupId: number,
    @Body('duration') duration: string,
    @Body('schedule') schedule: string,
  ) {
    return this.classesService.createClass(
      sportId,
      ageGroupId,
      duration,
      schedule,
    );
  }

  @Put(':id')
  updateClass(
    @Param('id') classId: number,
    @Body('sportId') sportId: number,
    @Body('ageGroupId') ageGroupId: number,
    @Body('duration') duration: string,
    @Body('schedule') schedule: string,
  ) {
    return this.classesService.updateClass(
      classId,
      sportId,
      ageGroupId,
      duration,
      schedule,
    );
  }

  @Delete(':id')
  deleteClass(@Param('id') classId: number) {
    return this.classesService.deleteClass(classId);
  }
}
