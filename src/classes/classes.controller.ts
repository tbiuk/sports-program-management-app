import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AgeGroupExistsPipe } from 'src/age-groups/pipes/age-group-exists.pipe';
import { AllAgeGroupNamesExistPipe } from 'src/age-groups/pipes/all-age-group-names-exist.pipe';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidBodyParamsInterceptor } from 'src/common/interceptors/valid-body-params.interceptor';
import { ValidQueryParamsInterceptor } from 'src/common/interceptors/valid-query-params.interceptor';
import { NotUndefinedPipe } from 'src/common/pipes/not-undefined.pipe';
import { AllSportNamesExistPipe } from 'src/sports/pipes/all-sport-names-exist.pipe';
import { SportExistsPipe } from 'src/sports/pipes/sport-exists.pipe';
import { ClassesService } from './classes.service';
import { ClassExistsPipe } from './pipes/class-exists.pipe';
import { StringToArrayPipe } from './pipes/string-to-array.pipe';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor(['sports', 'age']))
  getFilteredClasses(
    @Query('sports', StringToArrayPipe, AllSportNamesExistPipe)
    sportNames: string[],
    @Query('age', StringToArrayPipe, AllAgeGroupNamesExistPipe)
    ageGroupNames: string[],
  ) {
    return this.classesService.getFilteredClasses(sportNames, ageGroupNames);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getClassById(@Param('id', ClassExistsPipe) classId: number) {
    return this.classesService.getClassById(classId);
  }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    new ValidBodyParamsInterceptor([
      'sportId',
      'ageGroupId',
      'duration',
      'schedule',
    ]),
  )
  createClass(
    @Body('sportId', NotUndefinedPipe, SportExistsPipe) sportId: number,
    @Body('ageGroupId', NotUndefinedPipe, AgeGroupExistsPipe)
    ageGroupId: number,
    @Body('duration', NotUndefinedPipe) duration: string,
    @Body('schedule', NotUndefinedPipe) schedule: string,
  ) {
    return this.classesService.createClass(
      sportId,
      ageGroupId,
      duration,
      schedule,
    );
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['name', 'description']))
  updateClass(
    @Param('id', ClassExistsPipe) classId: number,
    @Body('sportId', NotUndefinedPipe, SportExistsPipe) sportId: number,
    @Body('ageGroupId', NotUndefinedPipe, AgeGroupExistsPipe)
    ageGroupId: number,
    @Body('duration', NotUndefinedPipe) duration: string,
    @Body('schedule', NotUndefinedPipe) schedule: string,
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
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  deleteClass(@Param('id', ClassExistsPipe) classId: number) {
    return this.classesService.deleteClass(classId);
  }
}
