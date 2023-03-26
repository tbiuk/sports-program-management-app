import { Injectable } from '@nestjs/common';
import { SportsRepository } from './repositories/sports.repository';

@Injectable()
export class SportsService {
  constructor(private readonly SportsRepository: SportsRepository) {}

  getAllSports() {
    return this.SportsRepository.getAllSports();
  }

  getSportById(id: number) {
    return this.SportsRepository.getSportById(id);
  }

  createSport(name: string, description: string) {
    return this.SportsRepository.createSport(name, description);
  }

  updateSport(id: number, name: string, description: string) {
    return this.SportsRepository.updateSport(id, name, description);
  }

  deleteSport(id: number) {
    return this.SportsRepository.deleteSport(id);
  }
}
