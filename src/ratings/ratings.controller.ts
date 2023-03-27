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
import { UserBelongsToClassInterceptor } from './interceptors/user-belongs-to-class.interceptor';

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
    @Query('class', ClassExistsOrUndefinedPipe) classID: number,
  ) {
    if (sportName) return this.ratingsService.getRatingForSport(sportName);
    if (classID) return this.ratingsService.getRatingForClass(classID);
    return this.ratingsService.getAllRatings();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getRatingById(@Param('id') id: number) {
    return this.ratingsService.getRatingById(id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['class', 'rating']))
  @UseInterceptors(UserBelongsToClassInterceptor)
  createRating(
    @Request() req,
    @Body('class', ClassExistsPipe) classID: number,
    @Body('rating', RatingValidationPipe) rating: number,
  ) {
    return this.ratingsService.upsertRating(classID, req.user.id, rating);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  deleteRating(@Param('id', RatingExistsPipe) id: number) {
    return this.ratingsService.deleteRating(id);
  }
}
