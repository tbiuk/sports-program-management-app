import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidBodyParamsInterceptor } from 'src/common/interceptors/valid-body-params.interceptor';
import { ValidQueryParamsInterceptor } from 'src/common/interceptors/valid-query-params.interceptor';
import { NotUndefinedPipe } from 'src/common/pipes/not-undefined.pipe';
import { AgeGroupsService } from './age-groups.service';
import { AgeGroupExistsPipe } from './pipes/age-group-exists.pipe';

@Controller('age-groups')
export class AgeGroupsController {
  constructor(private readonly ageGroupsService: AgeGroupsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getAllAgeGroups() {
    return this.ageGroupsService.getAllAgeGroups();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getAgeGroupById(@Param('id', AgeGroupExistsPipe) ageGroupId: number) {
    return this.ageGroupsService.getAgeGroupById(ageGroupId);
  }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['name']))
  createAgeGroup(@Body('name', NotUndefinedPipe) ageGroupName: string) {
    return this.ageGroupsService.createAgeGroup(ageGroupName);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  deleteAgeGroup(@Param('id', AgeGroupExistsPipe) ageGroupId: number) {
    return this.ageGroupsService.deleteAgeGroup(ageGroupId);
  }
}
