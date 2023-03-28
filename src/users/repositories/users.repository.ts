import { InjectKnex, Knex } from 'nestjs-knex';

export class UsersRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async addUser(
    email: string,
    hashedPassword: string,
    emailVerificationToken: string,
    ageGroupId: number,
  ) {
    return this.knex('users').insert({
      email,
      password: hashedPassword,
      email_verification_token: emailVerificationToken,
      age_group_id: ageGroupId,
    });
  }

  async findByEmail(email: string) {
    return this.knex('users').where({ email }).first();
  }

  async findByVerificationToken(token: string) {
    return this.knex('users')
      .where({ email_verification_token: token })
      .first();
  }

  async verify(userId: number) {
    return this.knex('users').where({ user_id: userId }).update({
      verified: true,
      email_verification_token: null,
    });
  }
}
