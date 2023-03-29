import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private readonly usersRepository: UsersRepository) {}

  async transform(value: number) {
    const user = await this.usersRepository.getUserById(value);
    if (!user) {
      throw new BadRequestException(`User with id ${value} does not exist`);
    }
    return value;
  }
}
