import { Injectable } from '@nestjs/common';
import { RatingsRepository } from './repositories/ratings.repository';

@Injectable()
export class RatingsService {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  getAllRatings() {
    return this.ratingsRepository.getAllRatings();
  }

  getRatingById(id: number) {
    return this.ratingsRepository.getRatingById(id);
  }

  createRating(classID: number, userID: number, rating: number) {
    return this.ratingsRepository.createRating(classID, userID, rating);
  }

  updateRating(id: number, updatedRating: any) {
    return this.ratingsRepository.updateRating(id, updatedRating);
  }

  deleteRating(id: number) {
    return this.ratingsRepository.deleteRating(id);
  }
}
