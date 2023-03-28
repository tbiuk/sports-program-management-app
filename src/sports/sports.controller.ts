import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidBodyParamsInterceptor } from 'src/common/interceptors/valid-body-params.interceptor';
import { ValidQueryParamsInterceptor } from 'src/common/interceptors/valid-query-params.interceptor';
import { NotUndefinedPipe } from 'src/common/pipes/not-undefined.pipe';
import { SportExistsPipe } from './pipes/sport-exists.pipe';
import { SportsService } from './sports.service';

@Controller('sports')
export class SportsController {
  constructor(private readonly SportsService: SportsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getAllSports() {
    return this.SportsService.getAllSports();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getSportById(@Param('id', SportExistsPipe) sportID: number) {
    return this.SportsService.getSportById(sportID);
  }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['name', 'description']))
  createSport(
    @Body('name', NotUndefinedPipe) sportName: string,
    @Body('description') sportDescription: string,
  ) {
    return this.SportsService.createSport(sportName, sportDescription);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['name', 'description']))
  updateSport(
    @Param('id', SportExistsPipe) sportID: number,
    @Body('name') sportName: string,
    @Body('description') sportDescription: string,
  ) {
    return this.SportsService.updateSport(sportID, sportName, sportDescription);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  deleteSport(@Param('id', SportExistsPipe) sportID: number) {
    return this.SportsService.deleteSport(sportID);
  }
}
