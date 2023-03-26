import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  getAllRatings() {
    return this.ratingsService.getAllRatings();
  }

  @Get(':id')
  getRatingById(@Param('id') id: number) {
    return this.ratingsService.getRatingById(id);
  }

  @Post()
  createRating(
    @Body('classID') classID: number,
    @Body('userID') userID: number,
    @Body('rating') rating: number,
  ) {
    return this.ratingsService.createRating(classID, userID, rating);
  }

  @Put(':id')
  updateRating(@Param('id') id: number, @Body('rating') rating: number) {
    return this.ratingsService.updateRating(id, rating);
  }

  @Delete(':id')
  deleteRating(@Param('id') id: number) {
    return this.ratingsService.deleteRating(id);
  }
}
