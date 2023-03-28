import { BadRequestException, Injectable } from '@nestjs/common';
import { SportsRepository } from './repositories/sports.repository';

@Injectable()
export class SportsService {
  constructor(private readonly sportsRepository: SportsRepository) {}

  getAllSports() {
    return this.sportsRepository.getAllSports();
  }

  getSportById(sportId: number) {
    return this.sportsRepository.getSportById(sportId);
  }

  private async checkNameUnique(
    sportName: string,
    excludeSportId: number = null,
  ) {
    const existingSport = await this.sportsRepository.getSportByName(sportName);

    if (existingSport && existingSport.sportId != excludeSportId) {
      throw new BadRequestException(
        `Sport with name ${sportName} already exists`,
      );
    }
  }

  async createSport(sportName: string, sportDescription: string) {
    await this.checkNameUnique(sportName);
    return this.sportsRepository.createSport(sportName, sportDescription);
  }

  async updateSport(
    sportId: number,
    sportName: string,
    sportDescription: string,
  ) {
    if (typeof sportName !== 'undefined') {
      await this.checkNameUnique(sportName, sportId);
    }

    return this.sportsRepository.updateSport(
      sportId,
      sportName,
      sportDescription,
    );
  }

  async deleteSport(sportId: number) {
    return this.sportsRepository.deleteSport(sportId);
  }

  getSportByName(sportName: string) {
    return this.sportsRepository.getSportByName(sportName);
  }
}
