import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SportsService } from './sports.service';

@Controller('sports')
export class SportsController {
  constructor(private readonly SportsService: SportsService) {}

  @Get()
  getAllSports() {
    return this.SportsService.getAllSports();
  }

  @Get(':id')
  getSportById(@Param('id') id: number) {
    return this.SportsService.getSportById(id);
  }

  @Post()
  createSport(
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return this.SportsService.createSport(name, description);
  }

  @Put(':id')
  updateSport(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return this.SportsService.updateSport(id, name, description);
  }

  @Delete(':id')
  deleteSport(@Param('id') id: number) {
    return this.SportsService.deleteSport(id);
  }
}
