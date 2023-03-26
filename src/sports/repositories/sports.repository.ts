import { InjectKnex, Knex } from 'nestjs-knex';

export class SportsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getAllSports() {
    return this.knex('sports');
  }

  async getSportById(id: number) {
    return this.knex('sports').where('sport_id', id).first();
  }

  async createSport(name: string, description: string) {
    return this.knex('sports').insert({
      name,
      description,
    });
  }

  async updateSport(id: number, name: string, description: string) {
    return this.knex('sports')
      .update({
        name,
        description,
      })
      .where('sport_id', id);
  }

  async deleteSport(id: number) {
    return this.knex('sports').where('sport_id', id).delete();
  }
}
