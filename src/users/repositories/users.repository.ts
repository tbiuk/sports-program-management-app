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

  getAllUsers() {
    return this.knex('users as USR')
      .select(
        'USR.user_id as userId',
        'USR.email',
        'USR.role',
        'USR.verified',
        'AGG.name as ageGroup',
        'AGG.age_group_id as ageGroupId',
      )
      .join('age_groups as AGG', 'AGG.age_group_id', 'USR.age_group_id');
  }

  async getUserByEmail(email: string) {
    return this.getAllUsers().where({ email }).first();
  }

  async getUserForValidationByEmail(email: string) {
    return this.getAllUsers().select('USR.password').where({ email }).first();
  }

  getUserById(userId: number) {
    return this.getAllUsers().where('user_id', userId).first();
  }

  async getUserByVerificationToken(token: string) {
    return this.getAllUsers()
      .where({ email_verification_token: token })
      .first();
  }

  async verifyUser(userId: number) {
    return this.knex('users').where({ user_id: userId }).update({
      verified: true,
      email_verification_token: null,
    });
  }

  deleteUser(userId: number) {
    return this.knex('users').where('user_id', userId).delete();
  }

  async setUserAdmin(userId: number) {
    return this.knex('users')
      .update({ role: 'admin' })
      .where('user_id', userId);
  }

  async setUserNotAdmin(userId: number) {
    return this.knex('users').update({ role: 'user' }).where('user_id', userId);
  }
}
