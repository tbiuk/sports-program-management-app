import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RatingValidationPipe } from './pipes/rating-validation.pipe';
import { RatingsService } from './ratings.service';
import { SportExistsOrUndefinedPipe } from '../sports/pipes/sport-exists-or-undefined.pipe';
import { ClassExistsOrUndefinedPipe } from 'src/classes/pipes/class-exists-or-undefined.pipe';
import { MutuallyExclusiveQueryParamsInterceptor } from 'src/common/interceptors/mutually-exclusive-query-params.interceptor';
import { ValidQueryParamsInterceptor } from 'src/common/interceptors/valid-query-params.interceptor';
import { ValidBodyParamsInterceptor } from 'src/common/interceptors/valid-body-params.interceptor';
import { RatingExistsPipe } from './pipes/rating-exists.pipe';
import { ClassExistsPipe } from 'src/classes/pipes/class-exists.pipe';
import { NotUndefinedPipe } from 'src/common/pipes/not-undefined.pipe';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    new MutuallyExclusiveQueryParamsInterceptor(['sport', 'class']),
  )
  @UseInterceptors(new ValidQueryParamsInterceptor(['sport', 'class']))
  getRatings(
    @Query('sport', SportExistsOrUndefinedPipe) sportName: string,
    @Query('class', ClassExistsOrUndefinedPipe) classId: number,
  ) {
    if (sportName) return this.ratingsService.getRatingForSport(sportName);
    if (classId) return this.ratingsService.getRatingForClass(classId);
    return this.ratingsService.getAllRatings();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getRatingById(@Param('id', RatingExistsPipe) ratingId: number) {
    return this.ratingsService.getRatingById(ratingId);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['class', 'rating']))
  async createRating(
    @Request() req,
    @Body('class', NotUndefinedPipe, ClassExistsPipe) classId: number,
    @Body('rating', RatingValidationPipe) rating: number,
  ) {
    await this.ratingsService.upsertRating(classId, req.user.id, rating);
    return { message: 'Class rated successfully' };
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  async deleteRating(@Param('id', RatingExistsPipe) ratingId: number) {
    await this.ratingsService.deleteRating(ratingId);
    return { message: 'Rating deleted successfully' };
  }
}
