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
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getAllSports() {
    return this.sportsService.getAllSports();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getSportById(@Param('id', SportExistsPipe) sportId: number) {
    return this.sportsService.getSportById(sportId);
  }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['name', 'description']))
  async createSport(
    @Body('name', NotUndefinedPipe) sportName: string,
    @Body('description') sportDescription: string,
  ) {
    await this.sportsService.createSport(sportName, sportDescription);
    return { message: 'Sport created successfully' };
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['name', 'description']))
  async updateSport(
    @Param('id', SportExistsPipe) sportId: number,
    @Body('name') sportName: string,
    @Body('description') sportDescription: string,
  ) {
    await this.sportsService.updateSport(sportId, sportName, sportDescription);
    return { message: 'Sport updated successfully' };
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  async deleteSport(@Param('id', SportExistsPipe) sportId: number) {
    await this.sportsService.deleteSport(sportId);
    return { message: 'Sport deleted successfully' };
  }
}
