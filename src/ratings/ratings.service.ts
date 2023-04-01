import { BadRequestException, Injectable } from '@nestjs/common';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { RatingsRepository } from './ratings.repository';

@Injectable()
export class RatingsService {
  constructor(
    private readonly ratingsRepository: RatingsRepository,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  getAllRatings() {
    return this.ratingsRepository.getAllRatings();
  }

  getRatingById(ratingId: number) {
    return this.ratingsRepository.getRatingById(ratingId);
  }

  private calcAverageRating(ratings) {
    const sum = ratings.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    const average = Math.round((sum / ratings.length) * 100) / 100;
    return average;
  }

  async getRatingForSport(sportName: string) {
    const ratings = (
      await this.ratingsRepository.getRatingsForSport(sportName)
    ).map((el) => el.rating);

    return {
      ratings,
      averageRating: this.calcAverageRating(ratings),
    };
  }

  async getRatingForClass(classId: number) {
    const ratings = (
      await this.ratingsRepository.getRatingsForClass(classId)
    ).map((el) => el.rating);

    return {
      ratings,
      averageRating: this.calcAverageRating(ratings),
    };
  }

  private async checkCanUpdateRating(userId: number, classId: number) {
    const belongsToClass =
      await this.enrollmentsService.getEnrollmentByUserAndClassId(
        classId,
        userId,
      );

    if (!belongsToClass) {
      throw new BadRequestException(
        'User does not belong to the specified class',
      );
    }
  }

  async upsertRating(classId: number, userId: number, rating: number) {
    await this.checkCanUpdateRating(userId, classId);
    return this.ratingsRepository.upsertRating(classId, userId, rating);
  }

  deleteRating(ratingId: number) {
    return this.ratingsRepository.deleteRating(ratingId);
  }
}
