import { InjectKnex, Knex } from 'nestjs-knex';

export class SportsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllSports() {
    return this.knex('sports').select(
      'sport_id as sportID',
      'name',
      'description',
    );
  }

  getSportById(id: number) {
    return this.getAllSports().where('sport_id', id).first();
  }

  createSport(name: string, description: string) {
    return this.knex('sports').insert({
      name,
      description,
    });
  }

  updateSport(id: number, name: string, description: string) {
    return this.knex('sports')
      .update({
        name,
        description,
      })
      .where('sport_id', id);
  }

  deleteSport(id: number) {
    return this.knex('sports').where('sport_id', id).delete();
  }
}
