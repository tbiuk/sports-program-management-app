import { ForbiddenException, Injectable } from '@nestjs/common';
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

  getRatingById(id: number) {
    return this.ratingsRepository.getRatingById(id);
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

  async getRatingForClass(classID: number) {
    const ratings = (
      await this.ratingsRepository.getRatingsForClassByID(classID)
    ).map((el) => el.rating);

    return {
      ratings,
      averageRating: this.calcAverageRating(ratings),
    };
  }

  private userBelongsToClass(userID: number, classID: number) {
    const res = this.enrollmentsService.getEnrollmentByUserAndClassID(
      classID,
      userID,
    );
    return res;
  }

  async upsertRating(classID: number, userID: number, rating: number) {
    if (!(await this.userBelongsToClass(userID, classID))) {
      throw new ForbiddenException(
        'User does not belong to the specified class',
      );
    }

    return this.ratingsRepository.upsertRating(classID, userID, rating);
  }

  deleteRating(id: number) {
    return this.ratingsRepository.deleteRating(id);
  }
}
