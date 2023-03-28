import { BadRequestException, Injectable } from '@nestjs/common';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { RatingsRepository } from './repositories/ratings.repository';

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
      await this.ratingsRepository.getRatingsForSportByName(sportName)
    ).map((el) => el.rating);

    return {
      ratings,
      averageRating: this.calcAverageRating(ratings),
    };
  }

  async getRatingForClass(classId: number) {
    const ratings = (
      await this.ratingsRepository.getRatingsForClassById(classId)
    ).map((el) => el.rating);

    return {
      ratings,
      averageRating: this.calcAverageRating(ratings),
    };
  }

  private userBelongsToClass(userId: number, classId: number) {
    const res = this.enrollmentsService.getEnrollmentByUserAndClassId(
      classId,
      userId,
    );
    return res;
  }

  async upsertRating(classId: number, userId: number, rating: number) {
    if (!(await this.userBelongsToClass(userId, classId))) {
      throw new BadRequestException(
        'User does not belong to the specified class',
      );
    }

    return this.ratingsRepository.upsertRating(classId, userId, rating);
  }

  deleteRating(ratingId: number) {
    return this.ratingsRepository.deleteRating(ratingId);
  }
}
