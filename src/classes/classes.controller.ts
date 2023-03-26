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
  getClassById(@Param('id') id: number) {
    return this.classesService.getClassById(id);
  }

  @Post()
  createClass(
    @Body('sportID') sportID: number,
    @Body('ageGroupID') ageGroupID: number,
    @Body('duration') duration: string,
    @Body('schedule') schedule: string,
  ) {
    return this.classesService.createClass(
      sportID,
      ageGroupID,
      duration,
      schedule,
    );
  }

  @Put(':id')
  updateClass(
    @Param('id') id: number,
    @Body('sportID') sportID: number,
    @Body('ageGroupID') ageGroupID: number,
    @Body('duration') duration: string,
    @Body('schedule') schedule: string,
  ) {
    return this.classesService.updateClass(
      id,
      sportID,
      ageGroupID,
      duration,
      schedule,
    );
  }

  @Delete(':id')
  deleteClass(@Param('id') id: number) {
    return this.classesService.deleteClass(id);
  }
}
